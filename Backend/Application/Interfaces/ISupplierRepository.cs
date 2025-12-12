public interface ISupplierRepository
{
    Task<IEnumerable<Supplier>> GetAllSuppliersAsync(bool trackChanges);
    Task<Supplier> GetSupplierAsync(int supplierId, bool trackChanges);
    void CreateSupplier(Supplier supplier);
}