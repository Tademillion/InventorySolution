
using Microsoft.EntityFrameworkCore;

public class StockMovementRepository : RepositoryBase<StockMovement>, IStockMovementRepository
{
    public StockMovementRepository(ApplicationDBContext context) : base(context)
    {
    }

    public void CreateStockMovement(StockMovement stockMovement) => Create(stockMovement);

    public async Task<IEnumerable<StockMovement>> GetAllStockMovementsAsync(bool trackChanges) => await FindAll(trackChanges)
        .ToListAsync();

    public async Task<IEnumerable<StockMovement>> GetByIdAsync(Guid ids, bool trackChanges) => await FindByCondition(s => s.StockMovementId == ids, trackChanges)
        .ToListAsync();

    public async Task<StockMovement> GetStockMovementAsync(Guid stockMovementId, bool trackChanges) => await FindByCondition(s => s.StockMovementId == stockMovementId, trackChanges)
        .FirstOrDefaultAsync();
}