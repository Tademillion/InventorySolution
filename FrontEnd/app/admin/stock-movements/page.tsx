"use client"

import { useState } from "react"
import { DataTable } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MOCK_STOCK_MOVEMENTS, MOCK_PRODUCTS } from "@/lib/mock-data"
import type { StockMovement } from "@/lib/types"
import { TrendingUp, ArrowDownCircle, ArrowUpCircle, Filter, FileText } from "lucide-react"
import Link from "next/link"

export default function StockMovementsPage() {
  const [filterType, setFilterType] = useState<"all" | "IN" | "OUT" | "ADJUSTMENT">("all")
  const [filterProduct, setFilterProduct] = useState<string>("all")

  const filteredMovements = MOCK_STOCK_MOVEMENTS.filter((movement) => {
    const typeMatch = filterType === "all" || movement.type === filterType
    const productMatch = filterProduct === "all" || movement.productId === filterProduct
    return typeMatch && productMatch
  })

  const columns = [
    {
      header: "Product",
      accessor: "productName" as const,
      className: "font-medium",
    },
    {
      header: "Type",
      accessor: (row: StockMovement) => (
        <Badge
          variant="outline"
          className={
            row.type === "IN"
              ? "border-success text-success"
              : row.type === "OUT"
                ? "border-warning text-warning"
                : "border-chart-1 text-chart-1"
          }
        >
          <div className="flex items-center gap-1">
            {row.type === "IN" ? (
              <ArrowDownCircle className="h-3 w-3" />
            ) : row.type === "OUT" ? (
              <ArrowUpCircle className="h-3 w-3" />
            ) : (
              <TrendingUp className="h-3 w-3" />
            )}
            {row.type}
          </div>
        </Badge>
      ),
    },
    {
      header: "Quantity",
      accessor: (row: StockMovement) => (
        <span
          className={`font-medium ${row.type === "IN" ? "text-success" : row.type === "OUT" ? "text-warning" : ""}`}
        >
          {row.type === "IN" ? "+" : row.type === "OUT" ? "-" : "±"}
          {row.quantity}
        </span>
      ),
    },
    {
      header: "Reason",
      accessor: "reason" as const,
      className: "capitalize",
    },
    {
      header: "Reference",
      accessor: (row: StockMovement) => {
        if (!row.referenceId) return <span className="text-muted-foreground">Manual</span>
        return (
          <Link
            href={`/admin/invoices/${row.referenceId}`}
            className="text-chart-1 hover:underline flex items-center gap-1"
          >
            <FileText className="h-3 w-3" />
            {row.referenceType}
          </Link>
        )
      },
    },
    {
      header: "Created By",
      accessor: "createdByName" as const,
    },
    {
      header: "Date",
      accessor: (row: StockMovement) =>
        row.createdAt.toLocaleString("en-US", { dateStyle: "short", timeStyle: "short" }),
    },
  ]

  // Calculate stats
  const stats = {
    total: filteredMovements.length,
    in: filteredMovements.filter((m) => m.type === "IN").length,
    out: filteredMovements.filter((m) => m.type === "OUT").length,
    adjustments: filteredMovements.filter((m) => m.type === "ADJUSTMENT").length,
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
          <TrendingUp className="h-8 w-8" />
          Stock Movements
        </h2>
        <p className="text-muted-foreground">Complete audit trail of all inventory changes</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-muted p-2">
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Movements</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-success/10 p-2">
                <ArrowDownCircle className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.in}</p>
                <p className="text-sm text-muted-foreground">Stock In</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-warning/10 p-2">
                <ArrowUpCircle className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.out}</p>
                <p className="text-sm text-muted-foreground">Stock Out</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-chart-1/10 p-2">
                <TrendingUp className="h-5 w-5 text-chart-1" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.adjustments}</p>
                <p className="text-sm text-muted-foreground">Adjustments</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Filters:</span>
            </div>
            <Select value={filterType} onValueChange={(v) => setFilterType(v as typeof filterType)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Movement Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="IN">Stock In</SelectItem>
                <SelectItem value="OUT">Stock Out</SelectItem>
                <SelectItem value="ADJUSTMENT">Adjustments</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterProduct} onValueChange={setFilterProduct}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Product" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Products</SelectItem>
                {MOCK_PRODUCTS.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {(filterType !== "all" || filterProduct !== "all") && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setFilterType("all")
                  setFilterProduct("all")
                }}
                className="bg-transparent"
              >
                Clear Filters
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <DataTable data={filteredMovements} columns={columns} />

      {/* Info Box */}
      <Card className="border-chart-1/20 bg-chart-1/5">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <TrendingUp className="h-5 w-5 text-chart-1 flex-shrink-0 mt-0.5" />
            <div className="space-y-1 text-sm">
              <p className="font-medium text-foreground">About Stock Movements</p>
              <p className="text-muted-foreground">
                Stock movements provide a complete audit trail of all inventory changes. Every stock change is
                automatically tracked with a reason, reference (invoice or adjustment), and the user who initiated it.
                This ensures full transparency and accountability in your inventory management.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
