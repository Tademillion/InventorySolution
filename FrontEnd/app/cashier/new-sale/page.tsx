"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MOCK_PRODUCTS, MOCK_CUSTOMERS } from "@/lib/mock-data"
import type { InvoiceItem } from "@/lib/types"
import { Plus, Trash2, ShoppingCart } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function NewSalePage() {
  const router = useRouter()
  const { user } = useAuth()
  const [selectedCustomer, setSelectedCustomer] = useState("")
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

    // Check stock availability
    const existingQty = items.find((i) => i.productId === product.id)?.quantity || 0
    const totalQty = existingQty + currentItem.quantity

    if (totalQty > product.stock) {
      setErrors([`Insufficient stock. Available: ${product.stock - existingQty} units`])
      return
    }

    const unitPrice = product.price
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

    if (!selectedCustomer) {
      setErrors(["Please select a customer"])
      return
    }

    if (items.length === 0) {
      setErrors(["Please add at least one item to the sale"])
      return
    }

    alert(
      `Sale completed!\n\nCustomer: ${MOCK_CUSTOMERS.find((c) => c.id === selectedCustomer)?.name}\nTotal: $${total.toFixed(2)}\nItems: ${items.length}\n\nStock has been automatically deducted.`,
    )
    router.push("/cashier")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          ← Back
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">New Sale</h2>
          <p className="text-muted-foreground">Create a sales invoice for a customer</p>
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
          {/* Product Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Select Products</CardTitle>
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
                      {MOCK_PRODUCTS.filter((p) => p.stock > 0).map((product) => (
                        <SelectItem key={product.id} value={product.id}>
                          <div className="flex items-center justify-between gap-4 w-full">
                            <span>
                              {product.name} - ${product.price.toFixed(2)}
                            </span>
                            <span className="text-xs text-muted-foreground">Stock: {product.stock}</span>
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
                Add to Cart
              </Button>
            </CardContent>
          </Card>

          {/* Cart Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Cart ({items.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {items.length === 0 ? (
                <div className="py-12 text-center text-muted-foreground">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No items in cart</p>
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

        {/* Order Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Customer</Label>
                <Select value={selectedCustomer} onValueChange={setSelectedCustomer}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {MOCK_CUSTOMERS.map((customer) => (
                      <SelectItem key={customer.id} value={customer.id}>
                        {customer.name}
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
                  <span className="font-semibold">Total</span>
                  <span className="text-xl font-bold">${total.toFixed(2)}</span>
                </div>
              </div>

              <Button onClick={handleConfirm} className="w-full" size="lg" disabled={items.length === 0}>
                Complete Sale
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
