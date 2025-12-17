import { WarehouseProp } from "@/lib/types";
import { WarehouseService } from "@/Services/warehouse.service";
import { useEffect, useState } from "react";

export function useWareHouse() {
  const [warehouses, setWarehouses] = useState<WarehouseProp[]>([]);
  const [loading, setLoading] = useState(true);
// Fetch warehouses on mount
useEffect(() => {
    load();
  }, []);
    const load = async () => {
        setLoading(true);
        await WarehouseService.getAll()
        .then((res) => {
            console.log("Fetched warehouses:", res.data);
            setWarehouses(res.data);
        })
        .finally(() => setLoading(false))
        .catch((err) => {
            console.error("Failed to fetch warehouses", err);
        })};
        //  add the warehouse to the state and update state optimistically
    const addWareHouse =  async (warehouse: WarehouseProp) => {
    //  add the warehouse and update the state optimistically
    const res= await WarehouseService.create(warehouse);
    setWarehouses((prevWarehouses) => [...prevWarehouses, warehouse]);
    return res.data;
  }
  return { warehouses, loading ,addWareHouse};
    }