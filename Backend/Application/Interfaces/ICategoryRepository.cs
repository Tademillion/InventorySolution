public interface ICategoryRepository
{
    Task<IEnumerable<Category>> GetAllCategoriesAsync(bool trackChanges);
    Task<Category> GetCategoryAsync(int categoryId, bool trackChanges);
    void CreateCategory(Category category);
}