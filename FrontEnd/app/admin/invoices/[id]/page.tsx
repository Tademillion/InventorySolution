"use client"

import { use } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MOCK_INVOICES } from "@/lib/mock-data"
import { FileText, Download, Package } from "lucide-react"

export default function InvoiceDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const invoice = MOCK_INVOICES.find((inv) => inv.id === id)

  if (!invoice) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <FileText className="h-12 w-12 text-muted-foreground/50 mb-3" />
        <p className="text-muted-foreground">Invoice not found</p>
        <Button variant="outline" onClick={() => router.back()} className="mt-4 bg-transparent">
          Go Back
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          ← Back
        </Button>
        <div className="flex-1">
          <h2 className="text-3xl font-bold tracking-tight">Invoice {invoice.invoiceNumber}</h2>
          <p className="text-muted-foreground">
            Created on {invoice.createdAt.toLocaleDateString("en-US", { dateStyle: "long" })}
          </p>
        </div>
        <Button variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Download PDF
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Invoice Details
                </CardTitle>
                <Badge
                  variant="outline"
                  className={
                    invoice.status === "confirmed"
                      ? "border-success text-success bg-success/10"
                      : invoice.status === "cancelled"
                        ? "border-destructive text-destructive"
                        : ""
                  }
                >
                  {invoice.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Invoice Number</p>
                  <p className="font-mono font-medium">{invoice.invoiceNumber}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Type</p>
                  <Badge
                    variant="outline"
                    className={
                      invoice.type === "purchase" ? "border-success text-success" : "border-chart-1 text-chart-1"
                    }
                  >
                    {invoice.type === "purchase" ? "Purchase" : "Sales"}
                  </Badge>
                </div>
                <div>
                  <p className="text-muted-foreground">{invoice.type === "purchase" ? "Supplier" : "Customer"}</p>
                  <p className="font-medium">{invoice.customerName || invoice.supplierName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Created By</p>
                  <p className="font-medium">{invoice.createdByName}</p>
                </div>
                {invoice.confirmedAt && (
                  <div>
                    <p className="text-muted-foreground">Confirmed At</p>
                    <p className="font-medium">
                      {invoice.confirmedAt.toLocaleDateString("en-US", { dateStyle: "medium" })}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                Invoice Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {invoice.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.quantity} × ${item.unitPrice.toFixed(2)}
                      </p>
                    </div>
                    <p className="font-medium">${item.totalPrice.toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${invoice.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-3 border-t">
                  <span className="font-semibold">Total</span>
                  <span className="text-xl font-bold">${invoice.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Stock Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground mb-3">
                This invoice {invoice.status === "confirmed" ? "has created" : "will create"} the following stock
                movements:
              </p>
              <div className="space-y-2">
                {invoice.items.map((item) => (
                  <div key={item.id} className="text-xs p-2 rounded bg-muted/50">
                    <p className="font-medium">{item.productName}</p>
                    <p className="text-muted-foreground">
                      {invoice.type === "purchase" ? "+" : "-"}
                      {item.quantity} units
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
