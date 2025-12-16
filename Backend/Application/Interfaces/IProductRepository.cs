public  interface IProductRepository
{
    Task<IEnumerable<Product>> GetAllProductsAsync(bool trackChanges);
    Task<IEnumerable<Product>> GetProductsAsync(IEnumerable<Guid> ids, bool trackChanges);
    void CreateProduct(Product product);
    Task<IEnumerable<Product>> GetByIdsAsync(Guid id, bool trackChanges);
    void DeleteProduct(Product product);
    
}