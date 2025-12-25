"use client"

import type React from "react"
import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Category } from "@/lib/types"

interface ProductDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product?: any 
  categories: Category[]
  suppliers: { id: string; name: string }[]
  warehouses: { id: string; name: string }[]
  onSave: (product: any) => void
}

export function ProductInventoryDialog({ 
  open, 
  onOpenChange, 
  product, 
  categories, 
  suppliers, 
  warehouses, 
  onSave 
}: ProductDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    CategoryId: "",
    Price: "",
    StockQuantity: 0,
    SupplierId: "",
    Cost: "",
    WarehouseId: ""
  })

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        CategoryId: product.CategoryId || "",
        Price: product.Price?.toString() || "",
        StockQuantity: product.StockQuantity || 0,
        SupplierId: product.SupplierId || "",
        Cost: product.Cost?.toString() || "",
        WarehouseId: product.WarehouseId || ""
      })
    }
  }, [product])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Add New Product"}</DialogTitle>
          <DialogDescription>
            {product ? "Update product information and inventory levels." : "Enter new product and warehouse details."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.CategoryId}
                  onValueChange={(value) => setFormData({ ...formData, CategoryId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.categoryId} value={cat.categoryId}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price (ETB)</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.Price}
                  onChange={(e) => setFormData({ ...formData, Price: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cost">Unit Cost</Label>
                <Input
                  id="cost"
                  type="number"
                  value={formData.Cost}
                  onChange={(e) => setFormData({ ...formData, Cost: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stock">Stock Quantity</Label>
                <Input
                  id="stock"
                  type="number"
                  value={formData.StockQuantity}
                  onChange={(e) => setFormData({ ...formData, StockQuantity: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="warehouse">Warehouse</Label>
                <Select
                  value={formData.WarehouseId}
                  onValueChange={(value) => setFormData({ ...formData, WarehouseId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select warehouse" />
                  </SelectTrigger>
                  <SelectContent>
                    {warehouses.map((w) => (
                      <SelectItem key={w.id} value={w.id}>{w.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="supplier">Supplier</Label>
              <Select
                value={formData.SupplierId}
                onValueChange={(value) => setFormData({ ...formData, SupplierId: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select supplier" />
                </SelectTrigger>
                <SelectContent>
                  {suppliers.map((s) => (
                    <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Product Details</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}