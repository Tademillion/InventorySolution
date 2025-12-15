"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MOCK_PRODUCTS, MOCK_INVOICES, MOCK_STOCK_MOVEMENTS } from "@/lib/mock-data"
import { TrendingUp, Package, DollarSign, Activity } from "lucide-react"
import { StatCard } from "@/components/shared/stat-card"

export default function AuditorAnalyticsPage() {
  const totalProducts = MOCK_PRODUCTS.length
  const activeProducts = MOCK_PRODUCTS.filter((p) => p.isActive).length
  const lowStockProducts = MOCK_PRODUCTS.filter((p) => p.stock < p.reorderLevel).length

  const totalRevenue = MOCK_INVOICES.filter((i) => i.type === "sales" && i.status === "confirmed").reduce(
    (sum, i) => sum + i.total,
    0,
  )

  const totalCost = MOCK_INVOICES.filter((i) => i.type === "purchase" && i.status === "confirmed").reduce(
    (sum, i) => sum + i.total,
    0,
  )

  const grossProfit = totalRevenue - totalCost
  const profitMargin = totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0

  const topProducts = MOCK_INVOICES.filter((i) => i.type === "sales" && i.status === "confirmed")
    .flatMap((i) => i.items)
    .reduce(
      (acc, item) => {
        const existing = acc.find((p) => p.productId === item.productId)
        if (existing) {
          existing.quantity += item.quantity
          existing.revenue += item.totalPrice
        } else {
          acc.push({
            productId: item.productId,
            productName: item.productName,
            quantity: item.quantity,
            revenue: item.totalPrice,
          })
        }
        return acc
      },
      [] as Array<{ productId: string; productName: string; quantity: number; revenue: number }>,
    )
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)

  return (
    <div className="page-container section-spacing">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics Overview</h1>
        <p className="text-muted-foreground">Comprehensive business intelligence and performance metrics</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Products" value={activeProducts} description={`${totalProducts} total`} icon={Package} />
        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue.toFixed(2)}`}
          trend={{ value: 12.5, isPositive: true }}
          icon={DollarSign}
        />
        <StatCard
          title="Gross Profit"
          value={`$${grossProfit.toFixed(2)}`}
          description={`${profitMargin.toFixed(1)}% margin`}
          icon={TrendingUp}
        />
        <StatCard title="Stock Movements" value={MOCK_STOCK_MOVEMENTS.length} description="All time" icon={Activity} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Products</CardTitle>
            <CardDescription>By revenue generated</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.productId} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{product.productName}</p>
                      <p className="text-sm text-muted-foreground">{product.quantity} units sold</p>
                    </div>
                  </div>
                  <p className="font-semibold">${product.revenue.toFixed(2)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Inventory Health</CardTitle>
            <CardDescription>Current stock status breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Active Products</p>
                  <p className="text-xs text-muted-foreground">Currently in catalog</p>
                </div>
                <p className="text-2xl font-bold">{activeProducts}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Low Stock Items</p>
                  <p className="text-xs text-muted-foreground">Below reorder level</p>
                </div>
                <p className="text-2xl font-bold text-warning">{lowStockProducts}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Out of Stock</p>
                  <p className="text-xs text-muted-foreground">Requires immediate attention</p>
                </div>
                <p className="text-2xl font-bold text-destructive">
                  {MOCK_PRODUCTS.filter((p) => p.stock === 0).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
