 import { Supplier, SupplierCreateDto } from "@/Types/supplier";
import { http } from "./http";
 
export const SupplierServices = {
  getAll: () => http.get<Supplier[]>("/suppliers"),

  getById: (id: number) =>
    http.get<Supplier>(`/suppliers/${id}`),

  create: (data: SupplierCreateDto) =>
    http.post("/suppliers", data),

  update: (id: number, data: Supplier) =>
    http.put(`/suppliers/${id}`, data), 
  delete: (id: number) =>
    http.delete(`/warehouses/${id}`),
};