public  interface IProductInventoryRepository
{
    Task<IEnumerable<ProductInventory>> GetAllProductInventoryAsync(bool trackChanges);
    Task<IEnumerable<ProductInventory>> GetProductInventoryAsync(IEnumerable<Guid> ids, bool trackChanges);
    void CreateProductInventory(ProductInventory product);
    Task<ProductInventory> GetByIdsAsync(int id, bool trackChanges);
    void DeleteProductInventory(ProductInventory product);
    
}