"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MOCK_WAREHOUSES } from "@/lib/mock-data"

interface WarehouseSelectorProps {
  value?: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function WarehouseSelector({ value, onChange, disabled }: WarehouseSelectorProps) {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger>
        <SelectValue placeholder="Select warehouse" />
      </SelectTrigger>
      <SelectContent>
        {MOCK_WAREHOUSES.filter((w) => w.isActive).map((warehouse) => (
          <SelectItem key={warehouse.id} value={warehouse.id}>
            <div className="flex flex-col">
              <span className="font-medium">{warehouse.name}</span>
              <span className="text-xs text-muted-foreground">
                {warehouse.city}, {warehouse.state}
              </span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
