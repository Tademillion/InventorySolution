 import { Supplier } from "@/Types/supplier";
import { http } from "./http";
import { CreateProductInventory, ProductInventory, UpdateProductInventory } from "@/Types/productinventory";
 
export const productInventoryService = {
  getAll: () => http.get<ProductInventory[]>("/productinventory"),

  getById: (id: number) =>
    http.get<ProductInventory>(`/productinventory/${id}`),

  create: (data: CreateProductInventory) =>
    http.post("/productinventory", data),

  update: (id: number, data: UpdateProductInventory) =>
    http.put(`/productinventory/${id}`, data), 
  delete: (id: number) =>
    http.delete(`/productinventory/${id}`),
};