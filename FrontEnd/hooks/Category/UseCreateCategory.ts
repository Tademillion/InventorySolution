import { Category } from "@/lib/types";
import { CategoryService } from "@/Services/category.services";
import { useState } from "react";

export function useCreateCategory() {
  const [loading, setLoading] = useState(false);

  const createCategory = async (data: Category) => {
    setLoading(true);
    await CategoryService.create(data).then(() => {
      console.log("Category created successfully");
    }).catch((error) => {
      // Optionally handle error (e.g., show an error message)
      console.error("Error creating category:", error);
    });
    setLoading(false);
  };

  return { createCategory, loading };
}
