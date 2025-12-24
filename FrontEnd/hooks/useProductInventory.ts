import { productInventoryService } from "@/Services/productInventoryService";
import { CreateProductInventory, ProductInventory } from "@/Types/productinventory";
import { useEffect, useState } from "react";

 
export function useSupplier() {
  const [suppliers, setSuppliers] = useState<ProductInventory[]>([]);
  const [loading, setLoading] = useState(true);
// Fetch suppliers on mount
useEffect(() => {
    load();
  }, []);
    const load = async () => {
        setLoading(true);
        await productInventoryService.getAll()
        .then((res) => {
            console.log("Fetched suppliers:", res.data);
            setSuppliers(res.data);
        })
        .finally(() => setLoading(false))
        .catch((err) => {
            console.error("Failed to fetch suppliers", err);
        })};
        //  add the supplier to the state and update state optimistically
    const addSupplier =  async (item: CreateProductInventory) => {
     const res= await productInventoryService.create(item); 
     await productInventoryService.getAll();
    return res.data;
  }
  return { suppliers, loading ,addSupplier};
    }