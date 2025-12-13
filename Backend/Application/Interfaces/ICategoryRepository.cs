public interface ICategoryRepository
{
    Task<IEnumerable<Category>> GetAllCategoriesAsync(bool trackChanges);
    Task<Category> GetCategoryAsync(int categoryId, bool trackChanges);
    Task<IEnumerable<Category>> GetByIdAsync(int ids, bool trackChanges);
    void CreateCategory(Category category);
}