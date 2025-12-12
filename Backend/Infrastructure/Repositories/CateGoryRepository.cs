using Microsoft.EntityFrameworkCore;

public class CategoryRepository : RepositoryBase<Category>, ICategoryRepository
{
    public CategoryRepository(ApplicationDBContext repositoryContext)
        : base(repositoryContext)
    {
    }

    public async Task<IEnumerable<Category>> GetAllCategoriesAsync(bool trackChanges) =>
        await FindAll(trackChanges)
        .OrderBy(c => c.Name)
        .ToListAsync();

    public async Task<Category> GetCategoryAsync(int categoryId, bool trackChanges) =>
        await FindByCondition(c => c.CategoryId == categoryId, trackChanges)
        .SingleOrDefaultAsync();

    public void CreateCategory(Category category) => Create(category);
}