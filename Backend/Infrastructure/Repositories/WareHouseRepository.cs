using Microsoft.EntityFrameworkCore;

public class WareHouseRepository : RepositoryBase<Warehouse>, IWareHouseRepository
{
 
    public WareHouseRepository(ApplicationDBContext context) : base(context)
    {
        
    }

    public async Task<Warehouse?> GetByIdAsync(Guid id, bool trackChanges)=>
    await FindByCondition(w => w.Id == id, trackChanges).SingleOrDefaultAsync();

    public async Task<IEnumerable<Warehouse>> GetAllAsync(bool trackChanges)=>
        await FindAll(trackChanges).ToListAsync();

    public async Task AddAsync(Warehouse warehouse)=>Create(warehouse);

 
   
}