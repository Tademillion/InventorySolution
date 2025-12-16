import { Category } from "@/lib/types";
import { CreateProductDto, ProductDto } from "@/Types/product";
import { http } from "./http";
 
export const CategoryService = {
  getAll: () => http.get<Category[]>("/categories"),

  getById: (id: number) =>
    http.get<Category>(`/categories/${id}`),

  create: (data: Category) =>
    http.post("/categories", data),

  update: (id: number, data: Category) =>
    http.put(`/categories/${id}`, data),

  delete: (id: number) =>
    http.delete(`/categories/${id}`),
};