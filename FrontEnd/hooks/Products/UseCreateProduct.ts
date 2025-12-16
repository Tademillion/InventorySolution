import { ProductService } from "@/Services/Products/product.services";
import { CreateProductDto } from "@/Types/product";
import { useState } from "react";

export function useCreateProduct() {
  const [loading, setLoading] = useState(false);

  const createProduct = async (data: CreateProductDto) => {
    setLoading(true);
    await ProductService.create(data);
    setLoading(false);
  };

  return { createProduct, loading };
}
