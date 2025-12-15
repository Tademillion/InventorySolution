"use client"

import { DataTable } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import { MOCK_PRODUCTS } from "@/lib/mock-data"
import type { Product } from "@/lib/types"
import { AlertTriangle } from "lucide-react"

export default function CashierProductsPage() {
  const columns = [
    {
      header: "Product Name",
      accessor: "name" as const,
      className: "font-medium",
    },
    {
      header: "Category",
      accessor: "categoryName" as const,
    },
    {
      header: "Price",
      accessor: (row: Product) => `$${row.price.toFixed(2)}`,
      className: "font-medium",
    },
    {
      header: "Stock",
      accessor: (row: Product) => {
        const isLowStock = row.stock <= row.reorderLevel
        const isOutOfStock = row.stock === 0

        return (
          <div className="flex items-center gap-2">
            <span className={isOutOfStock ? "text-destructive font-medium" : isLowStock ? "text-warning" : ""}>
              {row.stock} units
            </span>
            {isLowStock && <AlertTriangle className="h-4 w-4 text-warning" />}
          </div>
        )
      },
    },
    {
      header: "Status",
      accessor: (row: Product) => {
        if (row.stock === 0) {
          return (
            <Badge variant="destructive" className="bg-destructive text-destructive-foreground">
              Out of Stock
            </Badge>
          )
        }
        if (row.stock <= row.reorderLevel) {
          return (
            <Badge variant="outline" className="border-warning text-warning">
              Low Stock
            </Badge>
          )
        }
        return (
          <Badge variant="outline" className="border-success text-success">
            Available
          </Badge>
        )
      },
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
        <p className="text-muted-foreground">View product catalog and stock levels</p>
      </div>

      <DataTable data={MOCK_PRODUCTS} columns={columns} searchKey="name" searchPlaceholder="Search products..." />
    </div>
  )
}
