import { Supplier, WarehouseProp } from "@/lib/types";
import { SupplierServices } from "@/Services/supplier.services";
import { WarehouseService } from "@/Services/warehouse.service";
import { useEffect, useState } from "react";

export function useSupplier() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
// Fetch suppliers on mount
useEffect(() => {
    load();
  }, []);
    const load = async () => {
        setLoading(true);
        await SupplierServices.getAll()
        .then((res) => {
            console.log("Fetched suppliers:", res.data);
            setSuppliers(res.data);
        })
        .finally(() => setLoading(false))
        .catch((err) => {
            console.error("Failed to fetch suppliers", err);
        })};
        //  add the supplier to the state and update state optimistically
    const addSupplier =  async (supplier: Supplier) => {
     const res= await SupplierServices.create(supplier);
    setSuppliers((prevSuppliers) => [...prevSuppliers, supplier]);
    return res.data;
  }
  return { suppliers, loading ,addSupplier};
    }