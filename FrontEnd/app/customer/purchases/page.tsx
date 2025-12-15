"use client"

import { DataTable } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import { MOCK_INVOICES } from "@/lib/mock-data"
import type { Invoice } from "@/lib/types"

export default function CustomerPurchasesPage() {
  // Find customer purchases
  const myPurchases = MOCK_INVOICES.filter((inv) => inv.type === "sales" && inv.customerName?.includes("Doe"))

  const columns = [
    {
      header: "Invoice #",
      accessor: "invoiceNumber" as const,
      className: "font-mono font-medium",
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
          Completed
        </Badge>
      ),
    },
    {
      header: "Date",
      accessor: (row: Invoice) => row.createdAt.toLocaleDateString("en-US", { dateStyle: "long" }),
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Purchase History</h2>
        <p className="text-muted-foreground">View all your past purchases and invoices</p>
      </div>

      <DataTable
        data={myPurchases}
        columns={columns}
        searchKey="invoiceNumber"
        searchPlaceholder="Search invoices..."
      />
    </div>
  )
}
