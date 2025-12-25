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
import { Separator } from "@/components/ui/separator"
import { Package, DollarSign, Warehouse, Factory, Info } from "lucide-react"
import { CreateProductInventory } from "@/Types/productinventory"
import { useWareHouse } from "@/hooks/UseWareHouse"
import { useSupplier } from "@/hooks/useSupplier"
import { useProducts } from "@/hooks/Products/UseProducts"

interface ProductDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product?: any
   onSave: (product: any) => void
}

export function ProductInventoryDialog({
  open,
  onOpenChange,
  product,
   onSave,
}: ProductDialogProps) {
  const [formData, setFormData] = useState<CreateProductInventory>({
    ProductId: "",
    Price: "",
    StockQuantity: 0,
    SupplierId: "",
    Cost: "",
    WarehouseId: "",
  })
  //  
  //  const [category,setCategory]= useState();
  //  const [warehouse,setWareHouse]= useState();
  //  const [supplier,setSupplier]= useState();
   const {warehouses}= useWareHouse();
   const {suppliers}= useSupplier();
   const {products}= useProducts();
useEffect(()=>{
     
})

  useEffect(() => {
    if (product) {
      setFormData({
        ProductId: product.ProductId || "",
        description: product.description || "",
         Price: product.Price?.toString() || "",
        StockQuantity: product.StockQuantity || 0,
        SupplierId: product.SupplierId || "",
        Cost: product.Cost?.toString() || "",
        WarehouseId: product.WarehouseId || "",
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
      <DialogContent className="sm:max-w-[600px] w-[95vw] p-0 overflow-hidden bg-background border-none shadow-2xl rounded-xl">
        <DialogHeader className="p-6 pb-4 bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 rounded-xl">
              <Package className="w-6 h-6 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold tracking-tight">
                {product ? "Update Inventory" : "Register New Product"}
              </DialogTitle>
              <DialogDescription className="text-xs uppercase font-medium text-muted-foreground mt-0.5">
                SKU & Warehouse Management
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="p-6 space-y-8 max-h-[65vh] overflow-y-auto custom-scrollbar">
            
            {/* Row 1: Name & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-1 ">
              <div className="space-y-2.5">
                 <Label htmlFor="category" className="text-sm font-semibold">Product</Label>
                <Select
                  value={formData.ProductId}
                  onValueChange={(value) => setFormData({ ...formData, ProductId: value })}
                >
                  <SelectTrigger className="w-full h-11 bg-background overflow-hidden">
                    <SelectValue placeholder="Select Product" />
                  </SelectTrigger>
                  <SelectContent className="max-w-[var(--radix-select-trigger-width)]">
                    {products.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {/* <div className="space-y-2.5">
                <Label htmlFor="category" className="text-sm font-semibold">Category</Label>
                <Select
                  value={formData.CategoryId}
                  onValueChange={(value) => setFormData({ ...formData, CategoryId: value })}
                >
                  <SelectTrigger className="w-full h-11 bg-background overflow-hidden">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent className="max-w-[var(--radix-select-trigger-width)]">
                    {categories.map((cat) => (
                      <SelectItem key={cat.categoryId} value={cat.categoryId}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div> */}
            </div>

            {/* Row 2: Financials (3 Column Fixed Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-muted/20 p-4 rounded-lg border border-border/50">
                <div className="space-y-2">
                  <Label htmlFor="cost" className="text-[11px] uppercase font-bold text-muted-foreground">Unit Cost (ETB)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-muted-foreground text-sm font-medium">$</span>
                    <Input id="cost" type="number" className="pl-7 h-10 bg-background" value={formData.Cost} onChange={(e) => setFormData({ ...formData, Cost: e.target.value })} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-[11px] uppercase font-bold text-muted-foreground">Sale Price (ETB)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-muted-foreground text-sm font-medium">$</span>
                    <Input id="price" type="number" className="pl-7 h-10 bg-background" value={formData.Price} onChange={(e) => setFormData({ ...formData, Price: e.target.value })} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock" className="text-[11px] uppercase font-bold text-muted-foreground">Quantity</Label>
                  <Input id="stock" type="number" className="h-10 bg-background font-mono" value={formData.StockQuantity} onChange={(e) => setFormData({ ...formData, StockQuantity: parseInt(e.target.value) || 0 })} required />
                </div>
            </div>

            {/* Row 3: Logistics Dropdowns */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2.5">
                <Label htmlFor="warehouse" className="text-sm font-semibold flex items-center gap-2">
                  <Warehouse className="w-4 h-4 text-muted-foreground" /> Warehouse
                </Label>
                <Select
                  value={formData.WarehouseId}
                  onValueChange={(value) => setFormData({ ...formData, WarehouseId: value })}
                >
                  <SelectTrigger className="w-full h-11 bg-background overflow-hidden">
                    <SelectValue placeholder="Assign Location" />
                  </SelectTrigger>
                  <SelectContent className="max-w-[var(--radix-select-trigger-width)]">
                    {warehouses.map((w) => (
                      <SelectItem key={w.id} value={w.id}>{w.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2.5">
                <Label htmlFor="supplier" className="text-sm font-semibold flex items-center gap-2">
                  <Factory className="w-4 h-4 text-muted-foreground" /> Supplier
                </Label>
                <Select
                  value={formData.SupplierId}
                  onValueChange={(value) => setFormData({ ...formData, SupplierId: value })}
                >
                  <SelectTrigger className="w-full h-11 bg-background overflow-hidden">
                    <SelectValue placeholder="Select Provider" />
                  </SelectTrigger>
                  <SelectContent className="max-w-[var(--radix-select-trigger-width)]">
                    {suppliers.map((s,index) => (
                      <SelectItem key={index} value={s.supplierId}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2.5">
              <Label htmlFor="description" className="text-sm font-semibold">Notes & Specifications</Label>
              <Textarea
                id="description"
                placeholder="Internal notes regarding this batch..."
                className="min-h-[100px] bg-background resize-none focus:ring-primary/20"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter className="p-6 bg-muted/30 border-t flex flex-col sm:flex-row gap-3">
            <Button 
              type="button" 
              variant="outline" 
              className="w-full sm:w-auto px-6 h-11"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="w-full sm:w-auto px-10 h-11 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
            >
              {product ? "Save Changes" : "Create Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}