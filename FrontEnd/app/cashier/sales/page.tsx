"use client"

import { DataTable } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import { MOCK_INVOICES } from "@/lib/mock-data"
import { useAuth } from "@/lib/auth-context"
import type { Invoice } from "@/lib/types"

export default function SalesHistoryPage() {
  const { user } = useAuth()

  // Filter to show only sales by current cashier
  const mySales = MOCK_INVOICES.filter((inv) => inv.type === "sales" && inv.createdBy === user?.id)

  const columns = [
    {
      header: "Invoice #",
      accessor: "invoiceNumber" as const,
      className: "font-mono font-medium",
    },
    {
      header: "Customer",
      accessor: "customerName" as const,
    },
    {
      header: "Items",
      accessor: (row: Invoice) => `${row.items.length} items`,
    },
    {
      header: "Total",
      accessor: (row: Invoice) => `$${row.total.toFixed(2)}`,
      className: "font-medium",
    },
    {
      header: "Status",
      accessor: (row: Invoice) => (
        <Badge variant="outline" className="border-success text-success">
          {row.status}
        </Badge>
      ),
    },
    {
      header: "Date",
      accessor: (row: Invoice) => row.createdAt.toLocaleString("en-US", { dateStyle: "short", timeStyle: "short" }),
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">My Sales History</h2>
        <p className="text-muted-foreground">View all your completed sales transactions</p>
      </div>

      <DataTable data={mySales} columns={columns} searchKey="invoiceNumber" searchPlaceholder="Search invoices..." />
    </div>
  )
}
