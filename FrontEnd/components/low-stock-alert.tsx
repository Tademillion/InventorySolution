import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Product } from "@/lib/types"
import { AlertTriangle, Package } from "lucide-react"
import Link from "next/link"

interface LowStockAlertProps {
  products: Product[]
}

export function LowStockAlert({ products }: LowStockAlertProps) {
  const lowStockProducts = products.filter((p) => p.stock <= p.reorderLevel)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-warning" />
          Low Stock Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        {lowStockProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Package className="h-12 w-12 text-muted-foreground/50 mb-3" />
            <p className="text-sm text-muted-foreground">All products have adequate stock levels</p>
          </div>
        ) : (
          <div className="space-y-3">
            {lowStockProducts.slice(0, 5).map((product) => (
              <div key={product.id} className="flex items-center justify-between rounded-lg border p-3">
                <div className="space-y-1">
                  <p className="text-sm font-medium">{product.name}</p>
                  <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium">{product.stock} units</p>
                    <p className="text-xs text-muted-foreground">Min: {product.reorderLevel}</p>
                  </div>
                  {product.stock === 0 ? (
                    <Badge variant="destructive" className="bg-destructive text-destructive-foreground">
                      Out of Stock
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="border-warning text-warning">
                      Low Stock
                    </Badge>
                  )}
                </div>
              </div>
            ))}
            {lowStockProducts.length > 5 && (
              <Button variant="outline" size="sm" asChild className="w-full bg-transparent">
                <Link href="/admin/products">View All ({lowStockProducts.length})</Link>
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
