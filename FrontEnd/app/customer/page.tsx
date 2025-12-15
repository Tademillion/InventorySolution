"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MOCK_INVOICES } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-context"
import { ShoppingBag, FileText, DollarSign } from "lucide-react"
import Link from "next/link"

export default function CustomerDashboardPage() {
  const { user } = useAuth()

  // Find customer and their purchases
  const myPurchases = MOCK_INVOICES.filter((inv) => inv.type === "sales" && inv.customerName?.includes("Doe"))
  const totalSpent = myPurchases.reduce((sum, inv) => sum + inv.total, 0)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome, {user?.name}!</h2>
        <p className="text-muted-foreground">View your purchase history and invoices</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-chart-1/10 p-3">
                <ShoppingBag className="h-6 w-6 text-chart-1" />
              </div>
              <div>
                <p className="text-2xl font-bold">{myPurchases.length}</p>
                <p className="text-sm text-muted-foreground">Total Purchases</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-success/10 p-3">
                <DollarSign className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">${totalSpent.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Total Spent</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-muted p-3">
                <FileText className="h-6 w-6 text-muted-foreground" />
              </div>
              <div>
                <p className="text-2xl font-bold">{myPurchases.reduce((sum, inv) => sum + inv.items.length, 0)}</p>
                <p className="text-sm text-muted-foreground">Items Purchased</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Purchases */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Purchases</CardTitle>
            <Button variant="outline" size="sm" asChild className="bg-transparent">
              <Link href="/customer/purchases">View All</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {myPurchases.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              <ShoppingBag className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No purchases yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {myPurchases.slice(0, 5).map((invoice) => (
                <div key={invoice.id} className="flex items-center justify-between p-3 rounded-lg border">
                  <div className="space-y-1">
                    <p className="font-medium font-mono text-sm">{invoice.invoiceNumber}</p>
                    <p className="text-sm text-muted-foreground">
                      {invoice.items.length} items •{" "}
                      {invoice.createdAt.toLocaleDateString("en-US", { dateStyle: "medium" })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-medium">${invoice.total.toFixed(2)}</p>
                    </div>
                    <Badge variant="outline" className="border-success text-success">
                      Completed
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
