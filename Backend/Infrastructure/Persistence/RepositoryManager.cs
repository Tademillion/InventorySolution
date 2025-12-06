public class RepositoryManager : IRepositoryManager
{
    private readonly ApplicationDBContext _context;

    public RepositoryManager(ApplicationDBContext context)
    {
        _context = context;
    }
    public async Task SaveAsync()
    {
        await _context.SaveChangesAsync();
    }
}