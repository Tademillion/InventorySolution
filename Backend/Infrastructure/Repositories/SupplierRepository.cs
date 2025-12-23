using Microsoft.EntityFrameworkCore;

public class SupplierRepository : RepositoryBase<Supplier>, ISupplierRepository
{
    public SupplierRepository(ApplicationDBContext repositoryContext)
        : base(repositoryContext)
    {
    }

    public async Task<IEnumerable<Supplier>> GetAllSuppliersAsync(bool trackChanges) =>
        await FindAll(trackChanges)
        .OrderBy(s => s.Name)
        .ToListAsync();

    public async Task<Supplier> GetSupplierAsync(Guid supplierId, bool trackChanges) =>
        await FindByCondition(s => s.SupplierId.Equals(supplierId), trackChanges)
        .SingleOrDefaultAsync();

    public void CreateSupplier(Supplier supplier) => Create(supplier);
}