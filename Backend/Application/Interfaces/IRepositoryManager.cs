public interface IRepositoryManager
{
        public IProductRepository Product { get; }
        public ISupplierRepository Supplier { get; }
        public ICategoryRepository Category { get; }
         Task SaveAsync();
}