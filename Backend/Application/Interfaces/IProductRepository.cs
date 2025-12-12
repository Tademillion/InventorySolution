public  interface IProductRepository
{
    Task<IEnumerable<Product>> GetAllProductsAsync(bool trackChanges);
    Task<IEnumerable<Product>> GetProductsAsync(IEnumerable<int> ids, bool trackChanges);
    void CreateProduct(Product product);
    Task<IEnumerable<Product>> GetByIdsAsync(int id, bool trackChanges);
    void DeleteProduct(Product product);
    
}