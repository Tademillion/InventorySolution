public class RepositoryManager : IRepositoryManager
{
    private readonly ApplicationDBContext _context;
    private IProductRepository _productRepository;
    private ISupplierRepository _supplierRepository;
    public RepositoryManager(ApplicationDBContext context)
    {
        _context = context;
    }

    public IProductRepository Product
    {

        get
        {
            if(_productRepository == null) 
                _productRepository = new ProductRepository(_context);
            
            return _productRepository;
        }
    }

    public ISupplierRepository Supplier {
       get
        {
            if(_supplierRepository == null) 
                _supplierRepository = new SupplierRepository(_context); 
            return _supplierRepository;
        }
    }

    public async Task SaveAsync()
    {
        await _context.SaveChangesAsync();
    }
}