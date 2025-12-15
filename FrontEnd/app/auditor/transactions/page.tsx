"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MOCK_INVOICES } from "@/lib/mock-data"
import { FileText, TrendingUp, TrendingDown } from "lucide-react"
import { format } from "date-fns"
import type { InvoiceType, InvoiceStatus } from "@/lib/types"

export default function AuditorTransactionsPage() {
  const [filterType, setFilterType] = useState<InvoiceType | "all">("all")
  const [filterStatus, setFilterStatus] = useState<InvoiceStatus | "all">("all")

  const filteredInvoices = MOCK_INVOICES.filter((invoice) => {
    const matchesType = filterType === "all" || invoice.type === filterType
    const matchesStatus = filterStatus === "all" || invoice.status === filterStatus
    return matchesType && matchesStatus
  }).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

  const totalSales = MOCK_INVOICES.filter((i) => i.type === "sales" && i.status === "confirmed").reduce(
    (sum, i) => sum + i.total,
    0,
  )
  const totalPurchases = MOCK_INVOICES.filter((i) => i.type === "purchase" && i.status === "confirmed").reduce(
    (sum, i) => sum + i.total,
    0,
  )

  return (
    <div className="page-container section-spacing">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Transaction Review</h1>
        <p className="text-muted-foreground">Complete record of all purchase and sales transactions</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Sales</p>
                <p className="text-2xl font-bold">${totalSales.toFixed(2)}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Purchases</p>
                <p className="text-2xl font-bold">${totalPurchases.toFixed(2)}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/10">
                <TrendingDown className="h-6 w-6 text-destructive" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">Total Transactions</p>
                <p className="text-2xl font-bold">{MOCK_INVOICES.length}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter Transactions</CardTitle>
          <CardDescription>View transactions by type and status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Select value={filterType} onValueChange={(value) => setFilterType(value as InvoiceType | "all")}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="purchase">Purchase</SelectItem>
                <SelectItem value="sales">Sales</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as InvoiceStatus | "all")}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filteredInvoices.map((invoice) => (
          <Card key={invoice.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{invoice.invoiceNumber}</h3>
                    <Badge variant={invoice.type === "sales" ? "default" : "secondary"}>{invoice.type}</Badge>
                    <Badge
                      variant={
                        invoice.status === "confirmed"
                          ? "success"
                          : invoice.status === "cancelled"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {invoice.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {invoice.type === "sales" ? invoice.customerName : invoice.supplierName}
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">Items: {invoice.items.length}</span>
                    <span className="text-muted-foreground">Created by: {invoice.createdByName}</span>
                    <span className="text-muted-foreground">{format(invoice.createdAt, "MMM dd, yyyy HH:mm")}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">${invoice.total.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">Total</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
