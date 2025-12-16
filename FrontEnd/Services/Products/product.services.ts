import { CreateProductDto, ProductDto } from "@/Types/product";
import { http } from "../http";

export const ProductService = {
  getAll: () => http.get<ProductDto[]>("/products"),

  getById: (id: number) =>
    http.get<ProductDto>(`/products/${id}`),

  create: (data: CreateProductDto) =>
    http.post("/products", data),

  update: (id: number, data: CreateProductDto) =>
    http.put(`/products/${id}`, data),

  delete: (id: number) =>
    http.delete(`/products/${id}`),
};