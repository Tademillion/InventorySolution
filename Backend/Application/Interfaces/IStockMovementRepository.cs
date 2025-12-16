public interface IStockMovementRepository
{
    Task<IEnumerable<StockMovement>> GetAllStockMovementsAsync(bool trackChanges);
    Task<StockMovement> GetStockMovementAsync(Guid stockMovementId, bool trackChanges);
    Task<IEnumerable<StockMovement>> GetByIdAsync(Guid ids, bool trackChanges);
    void CreateStockMovement(StockMovement stockMovement);
}