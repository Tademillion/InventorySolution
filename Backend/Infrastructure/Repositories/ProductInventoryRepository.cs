
using Microsoft.EntityFrameworkCore;

public class ProductInventoryRepository : RepositoryBase<ProductInventory>, IProductInventoryRepository
{
    public ProductInventoryRepository(ApplicationDBContext context) : base(context)
    {
    }

    public void CreateProductInventory(ProductInventory product)=>Create(product);

    public void DeleteProductInventory(ProductInventory product)=>Delete(product);

    public async Task<IEnumerable<ProductInventory>> GetAllProductInventoryAsync(bool trackChanges)=>
        await FindAll(trackChanges)
        .Include(p=>p.Supplier)
        .Include(p=>p.Product).ThenInclude(p=>p.Category)
        .Include(p=>p.Warehouse)
        .ToListAsync();

    public async Task<ProductInventory> GetByIdsAsync(int id, bool trackChanges)=>
      await FindByCondition(p => p.Id.Equals(id), trackChanges)
       .Include(p=>p.Supplier)
      .Include(p=>p.Product).ThenInclude(p=>p.Category)
      .Include(p=>p.Warehouse)
      .SingleOrDefaultAsync(); 

    public async Task<IEnumerable<ProductInventory>> GetProductInventoryAsync(IEnumerable<Guid> ids, bool trackChanges)=>
       await FindByCondition(product => ids.Contains(product.ProductId), trackChanges).ToListAsync();
}