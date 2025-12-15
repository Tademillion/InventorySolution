"use client"

import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Calendar, AlertTriangle, CheckCircle } from "lucide-react"
import { format, differenceInDays } from "date-fns"

interface BatchInfoBadgeProps {
  batchNumber: string
  expiryDate?: Date
  manufacturingDate?: Date
  quantity: number
}

export function BatchInfoBadge({ batchNumber, expiryDate, manufacturingDate, quantity }: BatchInfoBadgeProps) {
  const daysUntilExpiry = expiryDate ? differenceInDays(expiryDate, new Date()) : null

  const getExpiryStatus = () => {
    if (!daysUntilExpiry) return { variant: "default", icon: Calendar, label: "No expiry" }
    if (daysUntilExpiry < 0) return { variant: "destructive", icon: AlertTriangle, label: "Expired" }
    if (daysUntilExpiry < 30) return { variant: "destructive", icon: AlertTriangle, label: `${daysUntilExpiry}d left` }
    if (daysUntilExpiry < 90) return { variant: "warning", icon: AlertTriangle, label: `${daysUntilExpiry}d left` }
    return { variant: "success", icon: CheckCircle, label: `${daysUntilExpiry}d left` }
  }

  const status = getExpiryStatus()
  const Icon = status.icon

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant={status.variant as "default" | "destructive" | "success" | "warning"} className="gap-1">
            <Icon className="h-3 w-3" />
            {batchNumber}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1 text-sm">
            <p>
              <strong>Batch:</strong> {batchNumber}
            </p>
            <p>
              <strong>Quantity:</strong> {quantity} units
            </p>
            {manufacturingDate && (
              <p>
                <strong>Manufactured:</strong> {format(manufacturingDate, "MMM dd, yyyy")}
              </p>
            )}
            {expiryDate && (
              <p>
                <strong>Expires:</strong> {format(expiryDate, "MMM dd, yyyy")}
              </p>
            )}
            <p>
              <strong>Status:</strong> {status.label}
            </p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
