public interface IRepositoryManager
{
        public IProductRepository Product { get; }
        public ISupplierRepository Supplier { get; }
         Task SaveAsync();
}