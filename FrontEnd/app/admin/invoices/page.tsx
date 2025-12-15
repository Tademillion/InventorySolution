"use client"

import { useState } from "react"
import { DataTable } from "@/components/data-table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MOCK_INVOICES } from "@/lib/mock-data"
import type { Invoice } from "@/lib/types"
import { Eye, Plus } from "lucide-react"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"

export default function InvoicesPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"all" | "purchase" | "sales">("all")

  const filteredInvoices = activeTab === "all" ? MOCK_INVOICES : MOCK_INVOICES.filter((inv) => inv.type === activeTab)

  const columns = [
    {
      header: "Invoice #",
      accessor: "invoiceNumber" as const,
      className: "font-mono font-medium",
    },
    {
      header: "Type",
      accessor: (row: Invoice) => (
        <Badge
          variant="outline"
          className={row.type === "purchase" ? "border-success text-success" : "border-chart-1 text-chart-1"}
        >
          {row.type === "purchase" ? "Purchase" : "Sales"}
        </Badge>
      ),
    },
    {
      header: "Customer/Supplier",
      accessor: (row: Invoice) => row.customerName || row.supplierName || "-",
    },
    {
      header: "Total",
      accessor: (row: Invoice) => `$${row.total.toFixed(2)}`,
      className: "font-medium",
    },
    {
      header: "Status",
      accessor: (row: Invoice) => {
        const variants = {
          draft: "secondary",
          confirmed: "outline",
          cancelled: "destructive",
        } as const
        return (
          <Badge
            variant={variants[row.status]}
            className={row.status === "confirmed" ? "border-success text-success bg-success/10" : ""}
          >
            {row.status}
          </Badge>
        )
      },
    },
    {
      header: "Date",
      accessor: (row: Invoice) => row.createdAt.toLocaleDateString(),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Invoices</h2>
          <p className="text-muted-foreground">Manage purchase and sales invoices</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.push("/admin/invoices/new?type=purchase")}>
            <Plus className="h-4 w-4 mr-2" />
            New Purchase
          </Button>
          <Button onClick={() => router.push("/admin/invoices/new?type=sales")}>
            <Plus className="h-4 w-4 mr-2" />
            New Sale
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)}>
        <TabsList>
          <TabsTrigger value="all">All Invoices ({MOCK_INVOICES.length})</TabsTrigger>
          <TabsTrigger value="purchase">
            Purchase ({MOCK_INVOICES.filter((i) => i.type === "purchase").length})
          </TabsTrigger>
          <TabsTrigger value="sales">Sales ({MOCK_INVOICES.filter((i) => i.type === "sales").length})</TabsTrigger>
        </TabsList>
        <TabsContent value={activeTab} className="mt-6">
          <DataTable
            data={filteredInvoices}
            columns={columns}
            searchKey="invoiceNumber"
            searchPlaceholder="Search invoices..."
            actions={(row) => (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/invoices/${row.id}`}>
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          />
        </TabsContent>
      </Tabs>
    </div>
  )
}
