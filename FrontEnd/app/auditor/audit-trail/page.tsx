"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MOCK_AUDIT_LOGS } from "@/lib/mock-data"
import { Search, Download } from "lucide-react"
import { format } from "date-fns"
import type { AuditAction, EntityType } from "@/lib/types"

export default function AuditTrailPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterAction, setFilterAction] = useState<AuditAction | "all">("all")
  const [filterEntity, setFilterEntity] = useState<EntityType | "all">("all")

  const filteredLogs = MOCK_AUDIT_LOGS.filter((log) => {
    const matchesSearch =
      log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.entityName?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesAction = filterAction === "all" || log.action === filterAction
    const matchesEntity = filterEntity === "all" || log.entityType === filterEntity
    return matchesSearch && matchesAction && matchesEntity
  }).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())

  const getActionColor = (action: AuditAction) => {
    switch (action) {
      case "create":
        return "success"
      case "update":
        return "default"
      case "delete":
        return "destructive"
      case "approve":
        return "success"
      case "reject":
        return "warning"
      default:
        return "secondary"
    }
  }

  return (
    <div className="page-container section-spacing">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Audit Trail</h1>
        <p className="text-muted-foreground">Complete log of all system activities and changes</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filter Audit Logs</CardTitle>
          <CardDescription>Search and filter through all system activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by user or entity name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            <Select value={filterAction} onValueChange={(value) => setFilterAction(value as AuditAction | "all")}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Actions</SelectItem>
                <SelectItem value="create">Create</SelectItem>
                <SelectItem value="update">Update</SelectItem>
                <SelectItem value="delete">Delete</SelectItem>
                <SelectItem value="view">View</SelectItem>
                <SelectItem value="approve">Approve</SelectItem>
                <SelectItem value="login">Login</SelectItem>
                <SelectItem value="logout">Logout</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterEntity} onValueChange={(value) => setFilterEntity(value as EntityType | "all")}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Entity Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="product">Product</SelectItem>
                <SelectItem value="invoice">Invoice</SelectItem>
                <SelectItem value="stock_movement">Stock Movement</SelectItem>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="warehouse">Warehouse</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Audit Logs ({filteredLogs.length})</CardTitle>
          <CardDescription>Detailed record of system activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredLogs.map((log) => (
              <div key={log.id} className="rounded-lg border p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant={getActionColor(log.action)}>{log.action}</Badge>
                      <Badge variant="outline">{log.entityType}</Badge>
                      <span className="text-sm font-medium">{log.userName}</span>
                      <Badge variant="secondary" className="text-xs">
                        {log.userRole}
                      </Badge>
                    </div>
                    <p className="text-sm">
                      <span className="font-medium">{log.entityName || log.entityId}</span>
                    </p>
                    {log.changes && (
                      <div className="rounded-md bg-muted p-2">
                        <p className="text-xs font-medium mb-1">Changes:</p>
                        <div className="space-y-1">
                          {Object.entries(log.changes).map(([key, value]) => (
                            <p key={key} className="text-xs text-muted-foreground font-mono">
                              {key}: {String(value.old)} → {String(value.new)}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}
                    {log.metadata && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        {Object.entries(log.metadata).map(([key, value]) => (
                          <span key={key}>
                            {key}: {String(value)}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm font-medium">{format(log.createdAt, "MMM dd, yyyy")}</p>
                    <p className="text-xs text-muted-foreground">{format(log.createdAt, "HH:mm:ss")}</p>
                    {log.ipAddress && <p className="text-xs text-muted-foreground">{log.ipAddress}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
