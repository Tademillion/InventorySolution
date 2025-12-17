import { Category, WarehouseProp } from "@/lib/types";
 import { http } from "./http";
 
export const WarehouseService = {
  getAll: () => http.get<WarehouseProp[]>("/warehouses"),

  getById: (id: number) =>
    http.get<WarehouseProp>(`/warehouses/${id}`),

  create: (data: WarehouseProp) =>
    http.post("/warehouses", data),

  update: (id: number, data: WarehouseProp) =>
    http.put(`/warehouses/${id}`, data),

  delete: (id: number) =>
    http.delete(`/warehouses/${id}`),
};