public interface IWareHouseRepository
{
    Task<Warehouse?> GetByIdAsync(Guid id, bool trackChanges);
    Task<IEnumerable<Warehouse>> GetAllAsync(bool trackChanges);
    Task AddAsync(Warehouse warehouse);
 }