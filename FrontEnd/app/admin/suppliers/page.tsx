"use client"

import { DataTable } from "@/components/data-table"
import { MOCK_SUPPLIERS } from "@/lib/mock-data"

export default function SuppliersPage() {
  const columns = [
    {
      header: "Supplier Name",
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
        <h2 className="text-3xl font-bold tracking-tight">Suppliers</h2>
        <p className="text-muted-foreground">Manage your supplier relationships</p>
      </div>

      <DataTable data={MOCK_SUPPLIERS} columns={columns} searchKey="name" searchPlaceholder="Search suppliers..." />
    </div>
  )
}
