"use client"

import { useState } from "react"
import { DataTable } from "@/components/data-table"
import { CategoryDialog } from "@/components/category-dialog"
import { Button } from "@/components/ui/button"
import { MOCK_CATEGORIES } from "@/lib/mock-data"
import type { Category } from "@/lib/types"
import { Plus, Pencil } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { useCreateCategory } from "@/hooks/Category/UseCreateCategory"

export default function CategoriesPage() {
  const [categories, setCategories] = useState(MOCK_CATEGORIES)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | undefined>()
  const { createCategory, loading } = useCreateCategory()
  const handleSave = (categoryData: Partial<Category>) => {
    if (editingCategory) {
      createCategory(categoryData as Category)
      console.log("Updating category:", categoryData)
      setCategories(categories.map((c) => (c.id === editingCategory.id ? { ...c, ...categoryData } : c)))
    } else { 
       console.log("Creating category:", categoryData)
      setCategories([...categories, categoryData as Category])
      createCategory(categoryData as Category)
    }
    setEditingCategory(undefined)
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category)
    setDialogOpen(true)
  }

  const handleAddNew = () => {
    setEditingCategory(undefined)
    setDialogOpen(true)
  }

  const columns = [
    {
      header: "Category Name",
      accessor: "name" as const,
      className: "font-medium",
    },
    {
      header: "Description",
      accessor: "description" as const,
    }
    // {
    //   header: "Created",
    //   accessor: (row: Category) => row.createdAt.toLocaleDateString(),
    // },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Categories</h2>
          <p className="text-muted-foreground">Organize your products into categories</p>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </div>

      <DataTable
        data={categories}
        columns={columns}
        searchKey="name"
        searchPlaceholder="Search categories..."
        actions={(row) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleEdit(row)}>
                <Pencil className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      />

      <CategoryDialog open={dialogOpen} onOpenChange={setDialogOpen} category={editingCategory} onSave={handleSave} />
    </div>
  )
}
