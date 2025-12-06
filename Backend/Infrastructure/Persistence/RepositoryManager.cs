public class RepositoryManager : IRepositoryManager
{
    private readonly ApplicationDBContext _context;
    private IProductRepository _productRepository;
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

    public async Task SaveAsync()
    {
        await _context.SaveChangesAsync();
    }
}