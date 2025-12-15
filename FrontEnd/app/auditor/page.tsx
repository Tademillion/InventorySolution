"use client"

import { StatCard } from "@/components/shared/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MOCK_AUDIT_LOGS, MOCK_INVOICES, MOCK_STOCK_MOVEMENTS, MOCK_AI_INSIGHTS } from "@/lib/mock-data"
import { ShieldCheck, FileText, AlertTriangle, Activity, CheckCircle } from "lucide-react"
import { format } from "date-fns"

export default function AuditorDashboard() {
  const recentAuditLogs = MOCK_AUDIT_LOGS.slice(0, 10).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  const totalTransactions = MOCK_INVOICES.length
  const totalMovements = MOCK_STOCK_MOVEMENTS.length
  const criticalIssues = MOCK_AI_INSIGHTS.filter((i) => i.type === "critical" || i.type === "warning").length

  const auditStats = {
    totalAudits: MOCK_AUDIT_LOGS.length,
    todayAudits: MOCK_AUDIT_LOGS.filter(
      (log) => format(log.createdAt, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd"),
    ).length,
    criticalActions: MOCK_AUDIT_LOGS.filter((log) => log.action === "delete" || log.action === "approve").length,
  }

  return (
    <div className="page-container section-spacing">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Audit Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive oversight and compliance monitoring</p>
        </div>
        <Badge variant="success" className="gap-1">
          <CheckCircle className="h-3 w-3" />
          System Compliant
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Audit Logs" value={auditStats.totalAudits} icon={ShieldCheck} />
        <StatCard
          title="Today's Activities"
          value={auditStats.todayAudits}
          description="Logged today"
          icon={Activity}
        />
        <StatCard
          title="Critical Actions"
          value={auditStats.criticalActions}
          description="Requires review"
          icon={AlertTriangle}
        />
        <StatCard title="Total Transactions" value={totalTransactions} icon={FileText} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Audit Trail</CardTitle>
            <CardDescription>Latest system activities and changes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAuditLogs.map((log) => (
                <div key={log.id} className="flex items-start gap-3 border-b pb-3 last:border-0">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                      log.action === "delete"
                        ? "bg-destructive/10 text-destructive"
                        : log.action === "create"
                          ? "bg-success/10 text-success"
                          : "bg-primary/10 text-primary"
                    }`}
                  >
                    <Activity className="h-4 w-4" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium">{log.userName}</p>
                      <Badge variant="outline" className="text-xs">
                        {log.userRole}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {log.action}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {log.entityType}: {log.entityName}
                    </p>
                    <p className="text-xs text-muted-foreground">{format(log.createdAt, "MMM dd, yyyy HH:mm")}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compliance Overview</CardTitle>
            <CardDescription>System health and compliance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Stock Movement Tracking</p>
                  <p className="text-xs text-muted-foreground">{totalMovements} movements logged</p>
                </div>
                <Badge variant="success">100%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Invoice Documentation</p>
                  <p className="text-xs text-muted-foreground">{totalTransactions} transactions recorded</p>
                </div>
                <Badge variant="success">100%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Critical Issues</p>
                  <p className="text-xs text-muted-foreground">{criticalIssues} items need attention</p>
                </div>
                <Badge variant={criticalIssues > 0 ? "warning" : "success"}>{criticalIssues} Issues</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium">User Activity Monitoring</p>
                  <p className="text-xs text-muted-foreground">All actions tracked</p>
                </div>
                <Badge variant="success">Active</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
