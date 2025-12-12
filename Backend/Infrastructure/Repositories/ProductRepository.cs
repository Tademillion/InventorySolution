
using Microsoft.EntityFrameworkCore;

public class ProductRepository : RepositoryBase<Product>, IProductRepository
{
    public ProductRepository(ApplicationDBContext context) : base(context)
    {
    }

    public void CreateProduct(Product product)=>Create(product);

    public void DeleteProduct(Product product)=>Delete(product);

    public async Task<IEnumerable<Product>> GetAllProductsAsync(bool trackChanges)=>
        await FindAll(trackChanges).ToListAsync();

    public async Task<IEnumerable<Product>> GetByIdsAsync(int id, bool trackChanges)=>
      await FindByCondition(product => id.Equals(product.Id), trackChanges).ToListAsync(); 

    public async Task<IEnumerable<Product>> GetProductsAsync(IEnumerable<int> ids, bool trackChanges)=>
       await FindByCondition(product => ids.Contains(product.Id), trackChanges).ToListAsync();
}