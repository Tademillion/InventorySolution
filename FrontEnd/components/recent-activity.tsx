import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Invoice, StockMovement } from "@/lib/types"
import { ArrowDownCircle, ArrowUpCircle, Activity } from "lucide-react"

interface RecentActivityProps {
  invoices: Invoice[]
  movements: StockMovement[]
}

export function RecentActivity({ invoices, movements }: RecentActivityProps) {
  // Combine and sort by date
  const activities = [
    ...invoices.map((inv) => ({ type: "invoice" as const, data: inv, date: inv.createdAt })),
    ...movements.slice(0, 5).map((mov) => ({ type: "movement" as const, data: mov, date: mov.createdAt })),
  ]
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 8)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => {
            if (activity.type === "invoice") {
              const invoice = activity.data
              return (
                <div key={`invoice-${invoice.id}-${index}`} className="flex items-start gap-3 text-sm">
                  <div
                    className={`rounded-full p-1.5 ${invoice.type === "purchase" ? "bg-success/10" : "bg-chart-1/10"}`}
                  >
                    {invoice.type === "purchase" ? (
                      <ArrowDownCircle className="h-4 w-4 text-success" />
                    ) : (
                      <ArrowUpCircle className="h-4 w-4 text-chart-1" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">
                      {invoice.type === "purchase" ? "Purchase" : "Sale"} Invoice {invoice.invoiceNumber}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {invoice.type === "purchase" ? invoice.supplierName : invoice.customerName} • $
                      {invoice.total.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {activity.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </div>
                </div>
              )
            } else {
              const movement = activity.data
              return (
                <div key={`movement-${movement.id}-${index}`} className="flex items-start gap-3 text-sm">
                  <div className={`rounded-full p-1.5 ${movement.type === "IN" ? "bg-success/10" : "bg-warning/10"}`}>
                    {movement.type === "IN" ? (
                      <ArrowDownCircle className="h-4 w-4 text-success" />
                    ) : (
                      <ArrowUpCircle className="h-4 w-4 text-warning" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="font-medium">
                      Stock {movement.type === "IN" ? "Added" : "Removed"}: {movement.productName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {movement.quantity} units • {movement.reason}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {activity.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </div>
                </div>
              )
            }
          })}
        </div>
      </CardContent>
    </Card>
  )
}
