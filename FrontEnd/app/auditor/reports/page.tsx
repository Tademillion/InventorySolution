"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Calendar } from "lucide-react"
import { format } from "date-fns"

const reportTypes = [
  {
    id: "1",
    name: "Inventory Valuation Report",
    description: "Complete valuation of all inventory items",
    type: "inventory_valuation",
    frequency: "Monthly",
  },
  {
    id: "2",
    name: "Stock Movement Summary",
    description: "All stock in/out movements with details",
    type: "stock_movement",
    frequency: "Weekly",
  },
  {
    id: "3",
    name: "Sales Performance Report",
    description: "Comprehensive sales analysis and trends",
    type: "sales_summary",
    frequency: "Monthly",
  },
  {
    id: "4",
    name: "Purchase Analysis",
    description: "Vendor performance and purchase patterns",
    type: "purchase_summary",
    frequency: "Monthly",
  },
  {
    id: "5",
    name: "Expiry Management Report",
    description: "Products expiring soon and batch tracking",
    type: "expiry_report",
    frequency: "Weekly",
  },
  {
    id: "6",
    name: "Complete Audit Trail",
    description: "All user actions and system changes",
    type: "audit_trail",
    frequency: "On-demand",
  },
]

export default function AuditorReportsPage() {
  const handleGenerateReport = (reportType: string) => {
    console.log("[v0] Generating report:", reportType)
    // In a real app, this would trigger report generation
  }

  return (
    <div className="page-container section-spacing">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
        <p className="text-muted-foreground">Generate comprehensive reports for compliance and analysis</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
          <CardDescription>Select a report type to generate</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {reportTypes.map((report) => (
              <Card key={report.id} className="card-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <h3 className="font-semibold">{report.name}</h3>
                          <p className="text-sm text-muted-foreground">{report.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>{report.frequency}</span>
                      </div>
                      <Button size="sm" onClick={() => handleGenerateReport(report.type)}>
                        <Download className="h-4 w-4 mr-2" />
                        Generate
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>Previously generated reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              {
                name: "Inventory Valuation - March 2024",
                date: new Date("2024-03-01"),
                status: "completed",
                size: "2.4 MB",
              },
              {
                name: "Sales Performance - February 2024",
                date: new Date("2024-02-28"),
                status: "completed",
                size: "1.8 MB",
              },
              {
                name: "Audit Trail - Q1 2024",
                date: new Date("2024-03-15"),
                status: "completed",
                size: "5.2 MB",
              },
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
