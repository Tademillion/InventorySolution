"use client"

import { DataTable } from "@/components/data-table"
import { MOCK_CUSTOMERS } from "@/lib/mock-data"

export default function CashierCustomersPage() {
  const columns = [
    {
      header: "Customer Name",
      accessor: "name" as const,
      className: "font-medium",
    },
    {
      header: "Email",
      accessor: "email" as const,
    },
    {
      header: "Phone",
      accessor: "phone" as const,
    },
    {
      header: "Address",
      accessor: "address" as const,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
        <p className="text-muted-foreground">View customer information</p>
      </div>

      <DataTable data={MOCK_CUSTOMERS} columns={columns} searchKey="name" searchPlaceholder="Search customers..." />
    </div>
  )
}
