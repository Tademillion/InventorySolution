"use client";

import { Product } from "@/lib/types";
import { ProductService } from "@/Services/Products/product.services";
import { CreateProductDto, ProductDto } from "@/Types/product";
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
      
  },[])
  const addProducts =  async (product: CreateProductDto) => { 
           const res= await ProductService.create(product);  
          setProducts((prevProducts) => [...prevProducts, res.data]);
          return res.data;
        }
  
  
  return { products, loading ,addProducts};
}
