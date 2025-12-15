"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MOCK_PRODUCTS, MOCK_BATCHES } from "@/lib/mock-data"
import { Search, Package, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import { BatchInfoBadge } from "@/components/features/batch-info-badge"

export default function AuditorInventoryPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredProducts = MOCK_PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const getStockStatus = (product: (typeof MOCK_PRODUCTS)[0]) => {
    if (product.stock === 0) return { status: "Out of Stock", variant: "destructive", icon: AlertTriangle }
    if (product.stock < product.reorderLevel) return { status: "Low Stock", variant: "warning", icon: Clock }
    return { status: "In Stock", variant: "success", icon: CheckCircle }
  }

  return (
    <div className="page-container section-spacing">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Inventory Review</h1>
        <p className="text-muted-foreground">Comprehensive view of all inventory items and stock levels</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Inventory</CardTitle>
          <CardDescription>Find products by name or SKU</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filteredProducts.map((product) => {
          const status = getStockStatus(product)
          const StatusIcon = status.icon
          const productBatches = MOCK_BATCHES.filter((b) => b.productId === product.id)

          return (
            <Card key={product.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{product.name}</h3>
                          <Badge variant={status.variant as "success" | "warning" | "destructive"} className="gap-1">
                            <StatusIcon className="h-3 w-3" />
                            {status.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">SKU: {product.sku}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{product.stock}</p>
                        <p className="text-xs text-muted-foreground">{product.unit}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Category</p>
                        <p className="font-medium">{product.categoryName}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Warehouse</p>
                        <p className="font-medium">{product.warehouseName}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Reorder Level</p>
                        <p className="font-medium">{product.reorderLevel}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Supplier</p>
                        <p className="font-medium">{product.supplierName}</p>
                      </div>
                    </div>

                    {product.hasBatchTracking && productBatches.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Batches:</p>
                        <div className="flex flex-wrap gap-2">
                          {productBatches.map((batch) => (
                            <BatchInfoBadge
                              key={batch.id}
                              batchNumber={batch.batchNumber}
                              expiryDate={batch.expiryDate}
                              manufacturingDate={batch.manufacturingDate}
                              quantity={batch.quantity}
                            />
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Cost: </span>
                        <span className="font-medium">${product.cost.toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Price: </span>
                        <span className="font-medium">${product.price.toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Margin: </span>
                        <span className="font-medium">
                          {(((product.price - product.cost) / product.price) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
