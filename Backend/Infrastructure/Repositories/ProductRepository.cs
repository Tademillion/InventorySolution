

using Microsoft.EntityFrameworkCore;

public class ProductRepository  :RepositoryBase<Product> , IProductRepository
{
    public ProductRepository(ApplicationDBContext context) : base(context)
    {
    }

    public void CreateProduct(Product product)=>Create(product);

    public void DeleteProduct(Product product)=>
    Delete(product);
    public async Task<IEnumerable<Product>> GetAllProductsAsync(bool trackChanges)=>
      await  FindAll(trackChanges).ToListAsync(); 

    public async Task<Product> GetProductByIdAsync(Guid Id, bool trackChanges)=>
     await FindByCondition(x=>x.Id.Equals(Id),trackChanges)
     .SingleOrDefaultAsync();

    
}