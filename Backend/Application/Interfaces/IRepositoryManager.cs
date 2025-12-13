public interface IRepositoryManager
{
        public IProductRepository Product { get; }
        public ISupplierRepository Supplier { get; }
        public ICategoryRepository Category { get; }
        public IInvoiceRepository Invoice { get; }
        public ICustomerRepository Customer { get; }
         Task SaveAsync();
}