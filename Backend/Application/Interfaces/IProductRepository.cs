public interface IProductRepository
{
    Task<IEnumerable<Product>> GetAllProductsAsync(bool trackChanges);
    Task<Product> GetProductByIdAsync(Guid productId, bool trackChanges);
    void CreateProduct(Product product);
    void DeleteProduct(Product product);
}