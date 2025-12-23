public interface ISupplierRepository
{
    Task<IEnumerable<Supplier>> GetAllSuppliersAsync(bool trackChanges);
    Task<Supplier> GetSupplierAsync(Guid supplierId, bool trackChanges);
    void CreateSupplier(Supplier supplier);
}