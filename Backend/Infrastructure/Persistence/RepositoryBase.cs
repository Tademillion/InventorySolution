// public abstract class RepositoryBase<TEntity> where TEntity : class
// {
//     protected readonly DbContext _context;

//     protected RepositoryBase(DbContext context)
//     {
//         _context = context;
//     }

//     public virtual async Task<TEntity> GetByIdAsync(int id)
//     {
//         return await _context.Set<TEntity>().FindAsync(id);
//     }

//     public virtual async Task<IEnumerable<TEntity>> GetAllAsync()
//     {
//         return await _context.Set<TEntity>().ToListAsync();
//     }

//     public virtual async Task AddAsync(TEntity entity)
//     {
//         await _context.Set<TEntity>().AddAsync(entity);
//         await _context.SaveChangesAsync();
//     }

//     public virtual async Task UpdateAsync(TEntity entity)
//     {
//         _context.Set<TEntity>().Update(entity);
//         await _context.SaveChangesAsync();
//     }

//     public virtual async Task DeleteAsync(TEntity entity)
//     {
//         _context.Set<TEntity>().Remove(entity);
//         await _context.SaveChangesAsync();
//     }
// }