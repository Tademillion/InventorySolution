"use client"

import { useState } from "react"
import { DataTable } from "@/components/data-table"
import { ProductDialog } from "@/components/product-dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_SUPPLIERS } from "@/lib/mock-data"
import type { Product } from "@/lib/types"
import { Plus, Pencil, AlertTriangle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { useProducts } from "@/hooks/Products/UseProducts"
import { CreateProductDto, ProductDto } from "@/Types/product"
import { useCategory } from "@/hooks/Category/UseCategory"
import { ColumnDef } from "@tanstack/react-table"

export default function ProductsPage() {
  // const [products, setProducts] = useState(MOCK_PRODUCTS)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<CreateProductDto | undefined>()

      const {products,addProducts}= useProducts();
      const {categories}= useCategory();
   const handleSave = (productData: CreateProductDto) => {
    if (editingProduct) {
    }
    addProducts(productData);
    setEditingProduct(undefined)
  }

  const handleEdit = (product: CreateProductDto) => {
    setEditingProduct(product)
    setDialogOpen(true)
  }

  const handleAddNew = () => {
    setEditingProduct(undefined)
    setDialogOpen(true)
  }

  const columns:ColumnDef<ProductDto>[]= [
    {
      header: "SKU",
      accessorKey: "sku" as const,
      // className: "font-mono text-xs",
    },
    {
      header: "Product Name",
      accessorKey: "name" as const,
      // className: "font-medium",
    },
    {
      header: "Category",
      accessorKey: "categoryName" as const,
    },
    
    {
      header: "Description",
      accessorFn: (row: ProductDto) => `$${row.description}`,
    },
    
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <p className="text-muted-foreground">Manage your product catalog</p>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Stock
        </Button>
      </div>

      <DataTable
        data={products}
        columns={columns}
        searchKey="name"
        searchPlaceholder="Search products..."
        
      />

      <ProductDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        product={editingProduct}
        categories={categories}
        
        onSave={handleSave}
      />
    </div>
  )
}
