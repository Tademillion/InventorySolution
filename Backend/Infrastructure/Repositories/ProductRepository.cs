
public class ProductRepository  :RepositoryBase<ProductInventory> , IProductRepository
{
    public ProductRepository(ApplicationDBContext context) : base(context)
    {
    }

    public void CreateProduct(Product product)
    {
        throw new NotImplementedException();
    }

    public void DeleteProduct(Product product)
    {
        throw new NotImplementedException();
    }

    public Task<IEnumerable<ProductInventoryDto>> GetAllProductsAsync(bool trackChanges)
    {
        throw new NotImplementedException();
    }

    public Task<ProductInventoryDto> GetProductByIdAsync(Guid productId, bool trackChanges)
    {
        throw new NotImplementedException();
    }
}