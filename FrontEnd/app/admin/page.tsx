"use client"

import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AutoReorderCard } from "@/components/features/auto-reorder-card"
import { MOCK_PRODUCTS, MOCK_INVOICES, MOCK_STOCK_MOVEMENTS, MOCK_AI_INSIGHTS, MOCK_WAREHOUSES } from "@/lib/mock-data"
import { Package, DollarSign, TrendingUp, AlertTriangle, Warehouse, Activity } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"

export default function AdminDashboardPage() {
  const totalProducts = MOCK_PRODUCTS.filter((p) => p.isActive).length
  const lowStockCount = MOCK_PRODUCTS.filter((p) => p.stock < p.reorderLevel && p.isActive).length
  const outOfStockCount = MOCK_PRODUCTS.filter((p) => p.stock === 0 && p.isActive).length

  const salesInvoices = MOCK_INVOICES.filter((inv) => inv.type === "sales" && inv.status === "confirmed")
  const totalSales = salesInvoices.reduce((sum, inv) => sum + inv.total, 0)

  const purchaseInvoices = MOCK_INVOICES.filter((inv) => inv.type === "purchase" && inv.status === "confirmed")
  const totalPurchases = purchaseInvoices.reduce((sum, inv) => sum + inv.total, 0)

  const totalStockValue = MOCK_PRODUCTS.reduce((sum, p) => sum + p.stock * p.cost, 0)

  const recentActivity = [
    ...MOCK_INVOICES.slice(0, 3).map((inv) => ({
      id: inv.id,
      type: inv.type === "sales" ? "Sale" : "Purchase",
      description: `${inv.invoiceNumber} - ${inv.type === "sales" ? inv.customerName : inv.supplierName}`,
      amount: inv.total,
      timestamp: inv.createdAt,
    })),
    ...MOCK_STOCK_MOVEMENTS.slice(0, 2).map((mov) => ({
      id: mov.id,
      type: "Stock Movement",
      description: `${mov.productName} - ${mov.type}`,
      amount: null,
      timestamp: mov.createdAt,
    })),
  ].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())

  const criticalInsights = MOCK_AI_INSIGHTS.filter((i) => i.type === "warning" || i.type === "critical").slice(0, 3)

  return (
    <div className="page-container section-spacing">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Enterprise inventory management overview</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Products"
          value={totalProducts}
          description={`${outOfStockCount} out of stock`}
          icon={Package}
          trend={{ value: 5.2, isPositive: true }}
        />
        <StatCard
          title="Total Sales"
          value={`$${totalSales.toFixed(2)}`}
          description="Confirmed invoices"
          icon={DollarSign}
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatCard
          title="Stock Value"
          value={`$${totalStockValue.toFixed(2)}`}
          description="Current inventory value"
          icon={TrendingUp}
          trend={{ value: 3.8, isPositive: true }}
        />
        <StatCard
          title="Low Stock Items"
          value={lowStockCount}
          description="Below reorder level"
          icon={AlertTriangle}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Active Warehouses</p>
                <p className="text-2xl font-bold">{MOCK_WAREHOUSES.filter((w) => w.isActive).length}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Warehouse className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Stock Movements</p>
                <p className="text-2xl font-bold">{MOCK_STOCK_MOVEMENTS.length}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
                <Activity className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Gross Profit</p>
                <p className="text-2xl font-bold">${(totalSales - totalPurchases).toFixed(2)}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
                <DollarSign className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest transactions and movements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.slice(0, 5).map((activity,index) => (
                <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {activity.type}
                      </Badge>
                      <p className="text-sm font-medium">{activity.description}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{format(activity.timestamp, "MMM dd, yyyy HH:mm")}</p>
                  </div>
                  {activity.amount && <p className="font-semibold">${activity.amount.toFixed(2)}</p>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Critical AI Insights</CardTitle>
            <CardDescription>Issues requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {criticalInsights.map((insight) => (
                <div key={insight.id} className="rounded-lg border p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-warning mt-0.5" />
                    <div className="flex-1 space-y-1">
                      <h4 className="font-medium text-sm">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                      {insight.recommendation && (
                        <p className="text-xs text-primary mt-2">💡 {insight.recommendation}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <Link href="/admin/ai-insights">
                <Badge variant="secondary" className="w-full justify-center cursor-pointer hover:bg-secondary/80">
                  View All Insights
                </Badge>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <AutoReorderCard />
    </div>
  )
}
