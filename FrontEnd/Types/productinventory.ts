export interface ProductInventory {
 
  id: number;
  productId: string;       
  productName: string;
  categoryName: string;
  description: string;
  price: number;
  cost: number;
  stock: number;
  supplierId: string;     
  supplierName: string;
  wareHouseId: string;    
  warehouseName: string; 
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
  
  ProductId: string;      
  Price: string;          
  stock: number;
  SupplierId: string;      
  Cost: string;            
  WarehouseId: string; 
  description?:string   

}

export interface UpdateProductInventory {
  price: number
  cost: number

  reorderLevel: number
  reorderQuantity: number

  unit: string

  isActive: boolean
}
