public interface ICategoryRepository
{
    Task<IEnumerable<Category>> GetAllCategoriesAsync(bool trackChanges);
    Task<Category> GetCategoryAsync(Guid categoryId, bool trackChanges);
    Task<IEnumerable<Category>> GetByIdAsync(Guid ids, bool trackChanges);
    void CreateCategory(Category category);
}