"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { BatchInfoBadge } from "@/components/features/batch-info-badge"
import { MOCK_BATCHES } from "@/lib/mock-data"
import { Search, Layers, AlertTriangle } from "lucide-react"
import { format, differenceInDays } from "date-fns"

export default function BatchesPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredBatches = MOCK_BATCHES.filter(
    (batch) =>
      batch.batchNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      batch.productName.toLowerCase().includes(searchQuery.toLowerCase()),
  ).sort((a, b) => {
    if (!a.expiryDate) return 1
    if (!b.expiryDate) return -1
    return a.expiryDate.getTime() - b.expiryDate.getTime()
  })

  const expiringBatches = MOCK_BATCHES.filter((b) => {
    if (!b.expiryDate) return false
    const daysUntilExpiry = differenceInDays(b.expiryDate, new Date())
    return daysUntilExpiry > 0 && daysUntilExpiry < 90
  })

  return (
    <div className="page-container section-spacing">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Batch Management</h1>
        <p className="text-muted-foreground">Track product batches with manufacturing and expiry dates</p>
      </div>

      {expiringBatches.length > 0 && (
        <Card className="border-warning/50 bg-warning/5">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              <CardTitle>Batches Expiring Soon</CardTitle>
            </div>
            <CardDescription>{expiringBatches.length} batches require attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {expiringBatches.map((batch) => (
                <BatchInfoBadge
                  key={batch.id}
                  batchNumber={batch.batchNumber}
                  expiryDate={batch.expiryDate}
                  manufacturingDate={batch.manufacturingDate}
                  quantity={batch.quantity}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Search Batches</CardTitle>
          <CardDescription>Find batches by number or product name</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search batches..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filteredBatches.map((batch) => {
          const daysUntilExpiry = batch.expiryDate ? differenceInDays(batch.expiryDate, new Date()) : null

          return (
            <Card key={batch.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Layers className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">{batch.batchNumber}</h3>
                          <Badge
                            variant={
                              batch.status === "expired"
                                ? "destructive"
                                : batch.status === "recalled"
                                  ? "destructive"
                                  : "success"
                            }
                          >
                            {batch.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{batch.productName}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold">{batch.quantity}</p>
                        <p className="text-xs text-muted-foreground">units</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Warehouse</p>
                        <p className="font-medium">{batch.warehouseName}</p>
                      </div>
                      {batch.manufacturingDate && (
                        <div>
                          <p className="text-muted-foreground">Manufactured</p>
                          <p className="font-medium">{format(batch.manufacturingDate, "MMM dd, yyyy")}</p>
                        </div>
                      )}
                      {batch.expiryDate && (
                        <div>
                          <p className="text-muted-foreground">Expires</p>
                          <p className="font-medium">{format(batch.expiryDate, "MMM dd, yyyy")}</p>
                        </div>
                      )}
                      {daysUntilExpiry !== null && (
                        <div>
                          <p className="text-muted-foreground">Days Until Expiry</p>
                          <p
                            className={`font-medium ${daysUntilExpiry < 30 ? "text-destructive" : daysUntilExpiry < 90 ? "text-warning" : ""}`}
                          >
                            {daysUntilExpiry > 0 ? `${daysUntilExpiry} days` : "Expired"}
                          </p>
                        </div>
                      )}
                    </div>

                    {(batch.supplierBatchNumber || batch.notes) && (
                      <div className="space-y-1 pt-2 border-t">
                        {batch.supplierBatchNumber && (
                          <p className="text-sm">
                            <span className="text-muted-foreground">Supplier Batch:</span>{" "}
                            <span className="font-mono">{batch.supplierBatchNumber}</span>
                          </p>
                        )}
                        {batch.notes && (
                          <p className="text-sm">
                            <span className="text-muted-foreground">Notes:</span> {batch.notes}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
