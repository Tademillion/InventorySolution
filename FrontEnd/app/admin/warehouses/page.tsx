"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MOCK_WAREHOUSES, MOCK_PRODUCTS } from "@/lib/mock-data"
import { Warehouse, MapPin, Package, Plus } from "lucide-react"
import { WarehouseDialog } from "@/components/warehouse-dialog"
 import { useState } from "react"
import {  WarehouseProp } from "@/lib/types"

export default function WarehousesPage() {
    const [dialogOpen, setDialogOpen] = useState(false)
      const [editingWarehouse, setEditingWarehouse] = useState<WarehouseProp | undefined>()
    
    const handleSave = (warehouseData: Partial<WarehouseProp>) => {
      if (editingWarehouse) {
        // addCategory(editingWarehouse as WarehouseProp)
        console.log("Updating category:", warehouseData)
        // setCategories(categories.map((c) => (c.id === editingCategory.id ? { ...c, ...categoryData } : c)))
      } else { 
         console.log("Creating category:", warehouseData)
        // setCategories([...categories, warehouseData as Category])
       }
      setEditingWarehouse(undefined)
    }
  return (
    <div className="page-container section-spacing">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Warehouses</h1>
          <p className="text-muted-foreground">Manage warehouse locations and capacity</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Warehouse
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {MOCK_WAREHOUSES.map((warehouse) => {
          const productsInWarehouse = MOCK_PRODUCTS.filter((p) => p.warehouseId === warehouse.id)
          const utilizationPercent = warehouse.capacity
            ? ((warehouse.currentUtilization || 0) / warehouse.capacity) * 100
            : 0

          return (
            <Card key={warehouse.id} className="card-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Warehouse className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{warehouse.name}</CardTitle>
                      <CardDescription className="text-xs">{warehouse.code}</CardDescription>
                    </div>
                  </div>
                  <Badge variant={warehouse.isActive ? "outline" : "secondary"}>
                    {warehouse.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>
                      {warehouse.city}, {warehouse.state} {warehouse.zipCode}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{warehouse.address}</p>
                </div>

                {warehouse.managerName && (
                  <div className="text-sm">
                    <span className="text-muted-foreground">Manager: </span>
                    <span className="font-medium">{warehouse.managerName}</span>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Capacity Utilization</span>
                    <span className="font-medium">{utilizationPercent.toFixed(1)}%</span>
                  </div>
                  <Progress value={utilizationPercent} className="h-2" />
                  {warehouse.capacity && (
                    <p className="text-xs text-muted-foreground">
                      {warehouse.currentUtilization} / {warehouse.capacity} units
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <Package className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{productsInWarehouse.length}</span>
                    <span className="text-muted-foreground">Products</span>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
      <WarehouseDialog open={false} onOpenChange={function (open: boolean): void {
        throw new Error("Function not implemented.")
      } } onSave={function (warehouse: Partial<WarehouseProp>): void {
        throw new Error("Function not implemented.")
      } } />
    </div>
          // <CategoryDialog open={dialogOpen} onOpenChange={setDialogOpen} category={editingCategory} onSave={handleSave} />
    
  )
}
