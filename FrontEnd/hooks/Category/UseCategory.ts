"use client";

 import { CategoryService } from "@/Services/category.services";
import { categoryDto } from "@/Types/category";
import { useEffect, useState } from "react";

export function useCategory() {
  const [categories, setCategories] = useState<categoryDto[]>([]);
  const [loading, setLoading] = useState(true);
// Fetch categories on mount
useEffect(() => {
    load();
  }, []);
    const load = async () => {
        setLoading(true);
        await CategoryService.getAll()
        .then((res) => {
            console.log("Fetched categories:", res.data);
            setCategories(res.data);
        })
        .finally(() => setLoading(false))
        .catch((err) => {
            console.error("Failed to fetch categories", err);
        })};
//    add the categories to the state and update state optimistically
  const addCategory =  async (category: categoryDto) => { 
    //  add the category and update the state optimistically
    const res= await CategoryService.create(category);
    setCategories((prevCategories) => [...prevCategories, category]);
    return res.data;
  }


  return { categories, loading ,addCategory};
}
