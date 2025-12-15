"use client"

import { StatCard } from "@/components/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MOCK_INVOICES, MOCK_PRODUCTS } from "@/lib/mock-data"
import { DollarSign, ShoppingCart, Package, TrendingUp } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function CashierDashboardPage() {
  const { user } = useAuth()

  // Filter sales by current cashier
  const mySalesInvoices = MOCK_INVOICES.filter((inv) => inv.type === "sales" && inv.createdBy === user?.id)
  const todaySales = mySalesInvoices.filter((inv) => {
    const today = new Date()
    return inv.createdAt.toDateString() === today.toDateString()
  })

  const totalSales = mySalesInvoices.reduce((sum, inv) => sum + inv.total, 0)
  const todayTotal = todaySales.reduce((sum, inv) => sum + inv.total, 0)

  const availableProducts = MOCK_PRODUCTS.filter((p) => p.stock > 0)
  const lowStockProducts = MOCK_PRODUCTS.filter((p) => p.stock > 0 && p.stock <= p.reorderLevel)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}!</h2>
        <p className="text-muted-foreground">Here's your sales overview</p>
      </div>

      {/* Quick Action */}
      <Card className="border-chart-1/50 bg-gradient-to-br from-chart-1/10 to-transparent">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-1">Ready to make a sale?</h3>
              <p className="text-sm text-muted-foreground mb-4">Create a new sales invoice to get started</p>
              <Button asChild size="lg">
                <Link href="/cashier/new-sale">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  New Sale
                </Link>
              </Button>
            </div>
            <ShoppingCart className="h-24 w-24 text-chart-1/20" />
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Today's Sales"
          value={`$${todayTotal.toFixed(2)}`}
          description={`${todaySales.length} transactions`}
          icon={DollarSign}
          trend={{ value: "Today", isPositive: true }}
        />
        <StatCard
          title="Total Sales"
          value={`$${totalSales.toFixed(2)}`}
          description={`${mySalesInvoices.length} total transactions`}
          icon={TrendingUp}
        />
        <StatCard title="Available Products" value={availableProducts.length} description="In stock" icon={Package} />
        <StatCard
          title="Low Stock Items"
          value={lowStockProducts.length}
          description="Need attention"
          icon={TrendingUp}
          className={lowStockProducts.length > 0 ? "border-warning/50" : ""}
        />
      </div>

      {/* Recent Sales */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>My Recent Sales</CardTitle>
            <Button variant="outline" size="sm" asChild className="bg-transparent">
              <Link href="/cashier/sales">View All</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {mySalesInvoices.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              <ShoppingCart className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No sales yet</p>
              <Button variant="outline" size="sm" asChild className="mt-4 bg-transparent">
                <Link href="/cashier/new-sale">Create Your First Sale</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {mySalesInvoices.slice(0, 5).map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="space-y-1">
                    <p className="font-medium font-mono text-sm">{invoice.invoiceNumber}</p>
                    <p className="text-sm text-muted-foreground">{invoice.customerName}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-medium">${invoice.total.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">
                        {invoice.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </p>
                    </div>
                    <Badge variant="outline" className="border-success text-success">
                      {invoice.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Product Quick View */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Product Stock Levels</CardTitle>
            <Button variant="outline" size="sm" asChild className="bg-transparent">
              <Link href="/cashier/products">View All Products</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {MOCK_PRODUCTS.slice(0, 6).map((product) => (
              <div key={product.id} className="flex items-center justify-between p-3 rounded-lg border">
                <div>
                  <p className="font-medium text-sm">{product.name}</p>
                  <p className="text-xs text-muted-foreground">${product.price.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p
                    className={`text-sm font-medium ${product.stock === 0 ? "text-destructive" : product.stock <= product.reorderLevel ? "text-warning" : "text-success"}`}
                  >
                    {product.stock} units
                  </p>
                  <p className="text-xs text-muted-foreground">in stock</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
