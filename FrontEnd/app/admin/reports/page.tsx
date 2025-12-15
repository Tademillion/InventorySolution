"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Download, TrendingUp, Package, DollarSign } from "lucide-react"
import { useState } from "react"
import { format } from "date-fns"

const reportCategories = [
  {
    category: "Inventory",
    icon: Package,
    reports: [
      { id: "inv-val", name: "Inventory Valuation", description: "Complete valuation of all stock items" },
      { id: "stock-level", name: "Stock Level Report", description: "Current stock levels across all warehouses" },
      { id: "movement", name: "Stock Movement Analysis", description: "Detailed movement history and trends" },
    ],
  },
  {
    category: "Financial",
    icon: DollarSign,
    reports: [
      { id: "sales-summary", name: "Sales Summary", description: "Revenue and sales performance analysis" },
      { id: "purchase-summary", name: "Purchase Summary", description: "Vendor spending and purchase patterns" },
      { id: "profit-loss", name: "Profit & Loss", description: "Comprehensive P&L statement" },
    ],
  },
  {
    category: "Operations",
    icon: TrendingUp,
    reports: [
      { id: "expiry", name: "Expiry Management", description: "Products expiring and batch tracking" },
      { id: "supplier-perf", name: "Supplier Performance", description: "Vendor ratings and delivery metrics" },
      { id: "customer-analysis", name: "Customer Analysis", description: "Customer purchase patterns and trends" },
    ],
  },
]

export default function AdminReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  const handleGenerateReport = (reportId: string) => {
    console.log("[v0] Generating report:", reportId, "for period:", selectedPeriod)
  }

  return (
    <div className="page-container section-spacing">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">Generate comprehensive business reports</p>
        </div>
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="quarter">This Quarter</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
            <SelectItem value="custom">Custom Range</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {reportCategories.map((category) => {
        const Icon = category.icon
        return (
          <Card key={category.category}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-primary" />
                <CardTitle>{category.category} Reports</CardTitle>
              </div>
              <CardDescription>Comprehensive {category.category.toLowerCase()} analytics and insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {category.reports.map((report) => (
                  <Card key={report.id} className="card-shadow">
                    <CardContent className="p-4 space-y-3">
                      <div className="space-y-1">
                        <h4 className="font-semibold">{report.name}</h4>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                      </div>
                      <Button size="sm" onClick={() => handleGenerateReport(report.id)} className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Generate
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      })}

      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>Previously generated reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { name: "Inventory Valuation Report", date: new Date(), size: "2.4 MB", status: "completed" },
              { name: "Sales Summary - March 2024", date: new Date("2024-03-01"), size: "1.8 MB", status: "completed" },
              { name: "Stock Movement Analysis", date: new Date("2024-02-28"), size: "3.2 MB", status: "completed" },
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{report.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(report.date, "MMM dd, yyyy")} • {report.size}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="success">{report.status}</Badge>
                  <Button size="sm" variant="outline">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
