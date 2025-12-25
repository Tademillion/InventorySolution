"use client"

import { useState } from "react"
 import { ProductDialog } from "@/components/product-dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MOCK_PRODUCTS, MOCK_CATEGORIES, MOCK_SUPPLIERS } from "@/lib/mock-data"
import type { Product } from "@/lib/types"
import { Plus, Pencil, AlertTriangle } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { useProducts } from "@/hooks/Products/UseProducts"
import { ProductInventory } from "@/Types/productinventory"
import { useProductInventory } from "@/hooks/useProductInventory"
import { DataTable } from "@/components/data-table"
  import { ColumnDef } from "@tanstack/react-table"
export default function ProductsPage() {
  // const [products, setProducts] = useState(MOCK_PRODUCTS)
  const {items:ProductItem}= useProductInventory();
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<ProductInventory | undefined>()

      const {products}= useProducts();
   const handleSave = (productData: Partial<Product>) => {
    if (editingProduct) {
    //   // Update existing
    //   setProducts(products.map((p) => (p.id === editingProduct.id ? { ...p, ...productData } : p)))
    // } else {
    //   // Create new
    //   const newProduct: Product = {
    //     id: Date.now().toString(),
    //     sku: productData.sku!,
    //     name: productData.name!,
    //     description: productData.description || "",
    //     categoryId: productData.categoryId!,
    //     categoryName: MOCK_CATEGORIES.find((c) => c.id === productData.categoryId)?.name || "",
    //     price: productData.price!,
    //     cost: productData.cost!,
    //     stock: 0,
    //     reorderLevel: productData.reorderLevel!,
    //     supplierId: productData.supplierId!,
    //     supplierName: MOCK_SUPPLIERS.find((s) => s.id === productData.supplierId)?.name || "",
    //     createdAt: new Date(),
    //     updatedAt: new Date(),
    //   }
    //   setProducts([...products, newProduct])
    }
    setEditingProduct(undefined)
  }

  const handleEdit = (product: Product) => {
    // setEditingProduct(product)
    setDialogOpen(true)
  }

  const handleAddNew = () => {
    setEditingProduct(undefined)
    setDialogOpen(true)
  }
  
 
  const newColumns: ColumnDef<ProductInventory>[]= [
    {
      header: "Product Name",
      accessorKey: "productName" as const,
     },
    {
      header: "Category",
      accessorKey: "categoryName" as const ,
    },
    {
      header:"Price",
      // accessorKey:"price"+"ETB",
      cell:({row}:{row:{original:any}})=>{
        const price= row.original.price;
        return(
          price +" ETB"
        );
      }
    },
     {
  header: "Stock",
    cell: ({ row }: { row: { original: any } }) => {
    const product = row.original.stock;
    // console.log("product is "+product);
    // const isLowStock = product.stock <= product.reorderLevel;
    // const isOutOfStock = product.stock === 0;
     const isOutOfStock=product===0;
   const isLowStock = product< 10;
 
    return (
      <div className="flex items-center gap-2">
        
        <span className={isOutOfStock ? "text-destructive font-medium" : isLowStock ? "text-warning font-medium" : ""}>
          {product} units 
        </span>
        {isLowStock  && (
          <AlertTriangle className="h-4 w-4 text-warning" />
        )}
        {isOutOfStock && !isOutOfStock && (
          <span className="text-[10px] bg-destructive/10 text-destructive px-2 py-0.5 rounded-full uppercase">
            Empty
          </span>
        )}
      </div>
    );
  },
},
    {
      header: "Supplier Name",
      accessorKey: "supplierName" as const ,
    },
    {
      header: "WareHouse Name",
      accessorKey: "warehouseName" as const ,
    }    
  ]

  const columns = [
    // {
    //   header: "SKU",
    //   accessor: "sku" as const,
    //   className: "font-mono text-xs",
    // },
    {
      header: "Product Name",
      accessor: "productName" as const,
      className: "font-medium",
    },
    {
      header: "Category",
      accessor: "categoryName" as const,
    },
    // {
    //   header: "Stock",
    //   accessor: (row: Product) => {
    //     const isLowStock = row.stock <= row.reorderLevel
    //     const isOutOfStock = row.stock === 0

    //     return (
    //       <div className="flex items-center gap-2">
    //         <span className={isOutOfStock ? "text-destructive font-medium" : isLowStock ? "text-warning" : ""}>
    //           {row.stock} units
    //         </span>
    //         {isLowStock && <AlertTriangle className="h-4 w-4 text-warning" />}
    //       </div>
    //     )
    //   },
    // },
    {
  // header: "Stock",
  // // Treating 'stock' as the direct value (string or number)
  // render: (stock: string | number) => {
  //   // Convert to number just in case it's a string "50"
  //   const stockValue = Number(stock);
    
  //   const isOutOfStock = stockValue === 0;
  //   const isLowStock = stockValue <= 10; // Your threshold

  //   return (
  //     <div className={`flex items-center gap-2 ${
  //       isOutOfStock ? "text-destructive font-medium" : 
  //       isLowStock ? "text-warning" : ""
  //     }`}>
  //       {stockValue} units
  //       {isLowStock && <AlertTriangle className="h-4 w-4" />}
  //     </div>
  //   );
  // }
},
    // {
    //   header: "Price",
    //   accessor: (row: Product) => `$${row.price.toFixed(2)}`,
    // },
    // {
    //   header: "Status",
    //   accessor: (row: Product) => {
    //     if (row.stock === 0) {
    //       return (
    //         <Badge variant="destructive" className="bg-destructive text-destructive-foreground">
    //           Out of Stock
    //         </Badge>
    //       )
    //     }
    //     if (row.stock <= row.reorderLevel) {
    //       return (
    //         <Badge variant="outline" className="border-warning text-warning">
    //           Low Stock
    //         </Badge>
    //       )
    //     }
    //     return (
    //       <Badge variant="outline" className="border-success text-success">
    //         In Stock
    //       </Badge>
    //     )
    //   },
    // },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Stock</h2>
          <p className="text-muted-foreground">Manage your product catalog</p>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="h-4 w-4 mr-2" />
          Add New Stock
        </Button>
      </div>

      <DataTable
        data={ProductItem}
        columns={newColumns}
        searchKey="productName"
        searchPlaceholder="Search products..."
        // actions={(row) => (
        //   <DropdownMenu>
        //     <DropdownMenuTrigger asChild>
        //       <Button variant="ghost" size="sm">
        //         <MoreHorizontal className="h-4 w-4" />
        //       </Button>
        //     </DropdownMenuTrigger>
        //     <DropdownMenuContent align="end">
        //       <DropdownMenuItem onClick={() => {}}>
        //         <Pencil className="h-4 w-4 mr-2" />
        //         Edit
        //       </DropdownMenuItem>
        //     </DropdownMenuContent>
        //   </DropdownMenu>
        // )}
      />

      <ProductDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        // product={editingProduct}
        categories={MOCK_CATEGORIES}
        // suppliers={MOCK_SUPPLIERS}
        onSave={handleSave}
      />
    </div>
  )
}
