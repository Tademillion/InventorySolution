
using Microsoft.EntityFrameworkCore;

public class ProductRepository : RepositoryBase<ProductInventory>, IProductInventoryRepository
{
    public ProductRepository(ApplicationDBContext context) : base(context)
    {
    }

    public void CreateProductInventory(ProductInventory product)=>Create(product);

    public void DeleteProductInventory(ProductInventory product)=>Delete(product);

    public async Task<IEnumerable<ProductInventory>> GetAllProductInventoryAsync(bool trackChanges)=>
        await FindAll(trackChanges).ToListAsync();

    public async Task<IEnumerable<ProductInventory>> GetByIdsAsync(Guid id, bool trackChanges)=>
      await FindByCondition(product => id.Equals(product.ProductId), trackChanges).ToListAsync(); 

    public async Task<IEnumerable<ProductInventory>> GetProductInventoryAsync(IEnumerable<Guid> ids, bool trackChanges)=>
       await FindByCondition(product => ids.Contains(product.ProductId), trackChanges).ToListAsync();
}