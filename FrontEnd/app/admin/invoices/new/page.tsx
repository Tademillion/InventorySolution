"use client"

import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MOCK_PRODUCTS, MOCK_SUPPLIERS, MOCK_CUSTOMERS } from "@/lib/mock-data"
import type { InvoiceItem, InvoiceType } from "@/lib/types"
import { Plus, Trash2, ShoppingCart, Package } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function NewInvoicePage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { user } = useAuth()
  const invoiceType = (searchParams.get("type") as InvoiceType) || "sales"

  const [selectedEntity, setSelectedEntity] = useState("")
  const [items, setItems] = useState<Partial<InvoiceItem>[]>([])
  const [currentItem, setCurrentItem] = useState({
    productId: "",
    quantity: 1,
  })
  const [errors, setErrors] = useState<string[]>([])

  const addItem = () => {
    setErrors([])
    const product = MOCK_PRODUCTS.find((p) => p.id === currentItem.productId)
    if (!product) {
      setErrors(["Please select a product"])
      return
    }

    if (currentItem.quantity <= 0) {
      setErrors(["Quantity must be greater than 0"])
      return
    }

    // For sales, check stock availability
    if (invoiceType === "sales") {
      const existingQty = items.find((i) => i.productId === product.id)?.quantity || 0
      const totalQty = existingQty + currentItem.quantity

      if (totalQty > product.stock) {
        setErrors([`Insufficient stock. Available: ${product.stock - existingQty} units`])
        return
      }
    }

    const unitPrice = invoiceType === "purchase" ? product.cost : product.price
    const existingItemIndex = items.findIndex((i) => i.productId === product.id)

    if (existingItemIndex >= 0) {
      const updatedItems = [...items]
      const existingItem = updatedItems[existingItemIndex]
      updatedItems[existingItemIndex] = {
        ...existingItem,
        quantity: (existingItem.quantity || 0) + currentItem.quantity,
        totalPrice: ((existingItem.quantity || 0) + currentItem.quantity) * unitPrice,
      }
      setItems(updatedItems)
    } else {
      setItems([
        ...items,
        {
          id: Date.now().toString(),
          productId: product.id,
          productName: product.name,
          quantity: currentItem.quantity,
          unitPrice,
          totalPrice: unitPrice * currentItem.quantity,
        },
      ])
    }

    setCurrentItem({ productId: "", quantity: 1 })
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const total = items.reduce((sum, item) => sum + (item.totalPrice || 0), 0)

  const handleConfirm = () => {
    setErrors([])

    if (!selectedEntity) {
      setErrors([`Please select a ${invoiceType === "purchase" ? "supplier" : "customer"}`])
      return
    }

    if (items.length === 0) {
      setErrors(["Please add at least one item to the invoice"])
      return
    }

    alert(
      `Invoice confirmed!\n\nType: ${invoiceType}\nTotal: $${total.toFixed(2)}\nItems: ${items.length}\n\nStock movements will be created automatically.`,
    )
    router.push("/admin/invoices")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          ← Back
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            New {invoiceType === "purchase" ? "Purchase" : "Sales"} Invoice
          </h2>
          <p className="text-muted-foreground">Create a new invoice and stock will be automatically adjusted</p>
        </div>
      </div>

      {errors.length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <ul className="list-disc list-inside">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Add Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Add Items
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="md:col-span-2 space-y-2">
                  <Label>Product</Label>
                  <Select
                    value={currentItem.productId}
                    onValueChange={(value) => setCurrentItem({ ...currentItem, productId: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select product" />
                    </SelectTrigger>
                    <SelectContent>
                      {MOCK_PRODUCTS.map((product) => (
                        <SelectItem
                          key={product.id}
                          value={product.id}
                          disabled={invoiceType === "sales" && product.stock === 0}
                        >
                          <div className="flex items-center justify-between gap-4">
                            <span>{product.name}</span>
                            {invoiceType === "sales" && (
                              <span className="text-xs text-muted-foreground">Stock: {product.stock}</span>
                            )}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    min="1"
                    value={currentItem.quantity}
                    onChange={(e) => setCurrentItem({ ...currentItem, quantity: Number.parseInt(e.target.value) || 1 })}
                  />
                </div>
              </div>
              <Button onClick={addItem} variant="outline" className="w-full bg-transparent">
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </CardContent>
          </Card>

          {/* Invoice Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Invoice Items ({items.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {items.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No items added yet</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                      <div className="flex-1">
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.quantity} × ${item.unitPrice?.toFixed(2)} = ${item.totalPrice?.toFixed(2)}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => removeItem(index)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Invoice Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>{invoiceType === "purchase" ? "Supplier" : "Customer"}</Label>
                <Select value={selectedEntity} onValueChange={setSelectedEntity}>
                  <SelectTrigger>
                    <SelectValue placeholder={`Select ${invoiceType === "purchase" ? "supplier" : "customer"}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {(invoiceType === "purchase" ? MOCK_SUPPLIERS : MOCK_CUSTOMERS).map((entity) => (
                      <SelectItem key={entity.id} value={entity.id}>
                        {entity.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2 pt-4 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Items</span>
                  <span className="font-medium">{items.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Quantity</span>
                  <span className="font-medium">{items.reduce((sum, item) => sum + (item.quantity || 0), 0)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t">
                  <span className="font-semibold">Total Amount</span>
                  <span className="text-lg font-bold">${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-4 space-y-2">
                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    <strong>Important:</strong> Confirming this invoice will automatically create stock movements and
                    adjust inventory levels.
                  </AlertDescription>
                </Alert>
              </div>

              <Button
                onClick={handleConfirm}
                className="w-full"
                size="lg"
                disabled={items.length === 0 || !selectedEntity}
              >
                Confirm Invoice
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Stock Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-xs">
                {items.map((item, index) => {
                  const product = MOCK_PRODUCTS.find((p) => p.id === item.productId)
                  if (!product) return null

                  const impact = invoiceType === "purchase" ? item.quantity : -(item.quantity || 0)
                  const newStock = product.stock + (impact || 0)

                  return (
                    <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                      <span className="text-muted-foreground truncate">{item.productName}</span>
                      <div className="flex items-center gap-2">
                        <span>{product.stock}</span>
                        <span className="text-muted-foreground">→</span>
                        <span className={newStock < product.reorderLevel ? "text-warning font-medium" : "font-medium"}>
                          {newStock}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
