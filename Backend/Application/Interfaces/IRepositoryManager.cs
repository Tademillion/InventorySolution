public interface IRepositoryManager
{
        public IProductInventoryRepository Product { get; }
        public ISupplierRepository Supplier { get; }
        public ICategoryRepository Category { get; }
        public IInvoiceRepository Invoice { get; }
        public ICustomerRepository Customer { get; }
        public IStockMovementRepository StockMovement { get; }
        public IWareHouseRepository Warehouse { get; }
        public IWarehouseCodeGenerator WarehouseCodeGenerator { get; }
          Task SaveAsync();
}