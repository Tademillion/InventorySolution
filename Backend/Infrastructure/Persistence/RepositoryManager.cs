public class RepositoryManager : IRepositoryManager
{
    private readonly ApplicationDBContext _context;
    private IProductRepository _productRepository;
    private ISupplierRepository _supplierRepository;
    private ICategoryRepository _categoryRepository;
    private IInvoiceRepository _invoiceRepository;
    private ICustomerRepository _customerRepository;
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

//  category
    public ICategoryRepository Category
    {
        get
        {
            if(_categoryRepository == null)
                _categoryRepository = new CategoryRepository(_context);
            return _categoryRepository;
        }
    }

    public IInvoiceRepository Invoice 
    {
        get
        {
            if (_invoiceRepository == null)
                _invoiceRepository = new InvoiceRepository(_context);
            return _invoiceRepository;
        }
    }

    public ICustomerRepository Customer 
    {
        get
        {
            if (_customerRepository == null)
                _customerRepository = new CustomerRepository(_context);
            return _customerRepository;
        }
        
    }

    public async Task SaveAsync()
    {
        await _context.SaveChangesAsync();
    }
}