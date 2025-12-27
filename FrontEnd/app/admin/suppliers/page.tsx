"use client"

import { DataTable } from "@/components/data-table"
import { SupplierDialog } from "@/components/supplier-dialog"
import { Button } from "@/components/ui/button"
import { useSupplier } from "@/hooks/useSupplier"
import { MOCK_SUPPLIERS } from "@/lib/mock-data"
import { Supplier } from "@/Types/supplier"
import { ColumnDef } from "@tanstack/react-table"
 import { Plus } from "lucide-react"
import { useState } from "react"
 
export default function SuppliersPage() {
   const {addSupplier,suppliers}=    useSupplier();
  const columns:ColumnDef<Supplier>[] = [
    {
      header: "Supplier Name",
      accessorKey: "name" as const,
     },
    {
      header: "Email",
      accessorKey: "email" as const,
    },
    {
      header: "Phone",
      accessorKey: "phone" as const,
    },
    {
      header: "Address",
      accessorKey: "address" as const,
    },
  ]
//  
    const [dialogOpen, setDialogOpen] = useState(false)
const handleAddNew = () => {
    // setEditingWarehouse(undefined)
    setDialogOpen(true)
  }
  const handleOnSave=(data:Supplier)=>{
addSupplier(data);
  }
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between">
        <div>
        <h2 className="text-3xl font-bold tracking-tight">Suppliers</h2>
        <p className="text-muted-foreground">Manage your supplier relationships</p>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="h-4 w-4 mr-2" />
          Add Supplier
        </Button>
      </div>
       
      </div>

      <DataTable data={suppliers} columns={columns} searchKey="name" searchPlaceholder="Search suppliers..." />
      <SupplierDialog open={dialogOpen} onOpenChange={setDialogOpen} onSave={handleOnSave}/>
    </div>
  )
}
