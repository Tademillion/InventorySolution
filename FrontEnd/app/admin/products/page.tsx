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
import { ProductDto } from "@/Types/product"

export default function ProductsPage() {
  // const [products, setProducts] = useState(MOCK_PRODUCTS)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<ProductDto | undefined>()

      const {products}= useProducts();
   const handleSave = (productData: Partial<Product>) => {
    if (editingProduct) {
    }
    setEditingProduct(undefined)
  }

  const handleEdit = (product: ProductDto) => {
    setEditingProduct(product)
    setDialogOpen(true)
  }

  const handleAddNew = () => {
    setEditingProduct(undefined)
    setDialogOpen(true)
  }

  const columns = [
    {
      header: "SKU",
      accessor: "sku" as const,
      className: "font-mono text-xs",
    },
    {
      header: "Product Name",
      accessor: "name" as const,
      className: "font-medium",
    },
    {
      header: "Category",
      accessor: "category" as const,
    },
    
    {
      header: "Description",
      accessor: (row: ProductDto) => `$${row.description}`,
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
        // searchKey="id"
        searchPlaceholder="Search products..."
        actions={(row) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleEdit(row)}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      />

      <ProductDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        product={editingProduct}
        categories={MOCK_CATEGORIES}
        suppliers={MOCK_SUPPLIERS}
        onSave={handleSave}
      />
    </div>
  )
}
