"use client";

import { ProductService } from "@/Services/Products/product.services";
import { ProductDto } from "@/Types/product";
import { useEffect, useState } from "react"; 

export function useProducts() {
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState(true);
// Fetch products on mount
  useEffect(() => {
    ProductService.getAll()
      .then(res => {
        console.log("Fetched products:", res.data);
        setProducts(res.data)})
      .finally(() => setLoading(false)).catch(err => {
        console.error("Failed to fetch products", err);
      });
  }, []);

  return { products, loading };
}
