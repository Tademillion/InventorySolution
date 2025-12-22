public interface IProductRepository
{
    Task<IEnumerable<ProductInventoryDto>> GetAllProductsAsync(bool trackChanges);
    Task<ProductInventoryDto> GetProductByIdAsync(Guid productId, bool trackChanges);
    void CreateProduct(Product product);
    void DeleteProduct(Product product);
}