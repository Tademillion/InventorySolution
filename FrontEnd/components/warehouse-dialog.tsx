"use client"

import type React from "react"
import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Warehouse } from "@/lib/types"
 
interface WarehouseDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  warehouse?: Warehouse
  onSave: (warehouse: Partial<Warehouse>) => void
}

export function WarehouseDialog({
  open,
  onOpenChange,
  warehouse,
  onSave,
}: WarehouseDialogProps) {
  const [formData, setFormData] = useState<Partial<Warehouse>>({
    name: "",
    code: "",
    location: "",
    description: "",
    isActive: true,
  })

  // ✅ Sync form when editing
  useEffect(() => {
    if (warehouse) {
      setFormData(warehouse)
    }
  }, [warehouse])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {warehouse ? "Edit Warehouse" : "Add New Warehouse"}
          </DialogTitle>
          <DialogDescription>
            {warehouse
              ? "Update warehouse information below."
              : "Enter warehouse details below."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">

            <div className="space-y-2">
              <Label htmlFor="name">Warehouse Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Main Warehouse"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="code">Warehouse Code *</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) =>
                  setFormData({ ...formData, code: e.target.value.toUpperCase() })
                }
                placeholder="WH-001"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder="Addis Ababa"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="Warehouse description"
                rows={3}
              />
            </div>

          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {warehouse ? "Update" : "Create"} Warehouse
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
