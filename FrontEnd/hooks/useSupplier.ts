import { SupplierServices } from "@/Services/supplier.services";
import { Supplier, SupplierCreateDto } from "@/Types/supplier";
import { useEffect, useState } from "react";

export function useSupplier() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(false);

  // Load suppliers
  const load = async () => {
    try {
      setLoading(true);
      const res = await SupplierServices.getAll();
      setSuppliers(res.data);
    } catch (error) {
      console.error("Failed to fetch suppliers", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // Create supplier
  const addSupplier = async (supplierDto: SupplierCreateDto) => {
    try {
      const res = await SupplierServices.create(supplierDto);

      // ✅ use backend response
      setSuppliers((prev) => [...prev, res.data]);

      return res.data;
    } catch (error) {
      console.error("Failed to create supplier", error);
      throw error;
    }
  };

  return {
    suppliers,
    loading,
    addSupplier,
    reload: load,
  };
}
