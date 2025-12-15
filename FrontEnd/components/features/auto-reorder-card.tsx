"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, TrendingUp, Package } from "lucide-react"
import { MOCK_PRODUCTS } from "@/lib/mock-data"

export function AutoReorderCard() {
  const lowStockProducts = MOCK_PRODUCTS.filter((p) => p.stock < p.reorderLevel && p.isActive)

  const handleAutoReorder = (productId: string) => {
    console.log("[v0] Auto-reorder triggered for product:", productId)
    // In a real app, this would call the API to create a purchase order
  }

  if (lowStockProducts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <CardTitle>Smart Reordering</CardTitle>
            </div>
            <Badge variant="success">All Good</Badge>
          </div>
          <CardDescription>All products are above reorder levels</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-warning" />
            <CardTitle>Smart Reordering</CardTitle>
          </div>
          <Badge variant="warning">{lowStockProducts.length} Items Need Attention</Badge>
        </div>
        <CardDescription>Products below reorder levels with AI-optimized quantities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {lowStockProducts.slice(0, 5).map((product) => {
            const suggestedQuantity = Math.max(product.reorderQuantity, product.reorderLevel - product.stock)
            const estimatedCost = suggestedQuantity * product.cost

            return (
              <div key={product.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{product.name}</p>
                    <Badge variant="destructive" className="text-xs">
                      Stock: {product.stock}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Package className="h-3 w-3" />
                      Suggested: {suggestedQuantity} units
                    </span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      Est. Cost: ${estimatedCost.toFixed(2)}
                    </span>
                  </div>
                </div>
                <Button size="sm" onClick={() => handleAutoReorder(product.id)}>
                  Create PO
                </Button>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
