export interface Supplier {
  supplierId: string
  name: string
  email: string
  phone: string
  address: string
 isActive:boolean
}

export interface  SupplierCreateDto{
  name: string
  email: string
  phone: string
  address: string
  isActive:boolean
}