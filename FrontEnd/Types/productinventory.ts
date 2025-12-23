export interface ProductInventory {
  productId: string

  sku: string
  name: string
  description?: string

  price: number
  cost: number

  stock: number

  reorderLevel: number
  reorderQuantity: number

  unit: string

  hasBatchTracking: boolean
  hasExpiryTracking: boolean

  barcode?: string
  imageUrl?: string

  isActive: boolean

  categoryId: string
  categoryName: string

  supplierId: string
  supplierName: string

  warehouseId: string
  warehouseName: string

  createdAt: string
  updatedAt: string
}

export interface ProductInventoryListItem {
  productId: string
  sku: string
  name: string

  categoryName: string
  warehouseName: string

  stock: number
  reorderLevel: number

  price: number

  isActive: boolean
}

export interface CreateProductInventory {
  productId: string
  warehouseId: string

  price: number
  cost: number

  reorderLevel: number
  reorderQuantity: number

  unit: string

  hasBatchTracking: boolean
  hasExpiryTracking: boolean
}

export interface UpdateProductInventory {
  price: number
  cost: number

  reorderLevel: number
  reorderQuantity: number

  unit: string

  isActive: boolean
}
