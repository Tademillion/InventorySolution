public interface IStockMovementRepository
{
    Task<IEnumerable<StockMovement>> GetAllStockMovementsAsync(bool trackChanges);
    Task<StockMovement> GetStockMovementAsync(int stockMovementId, bool trackChanges);
    Task<IEnumerable<StockMovement>> GetByIdAsync(int ids, bool trackChanges);
    void CreateStockMovement(StockMovement stockMovement);
}