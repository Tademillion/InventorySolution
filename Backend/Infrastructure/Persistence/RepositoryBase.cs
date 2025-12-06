using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

public abstract class RepositoryBase<TEntity> where TEntity : class
{
    protected readonly ApplicationDBContext _context;

    protected RepositoryBase(ApplicationDBContext context)
    {
        _context = context;
    }

     public IQueryable<TEntity> FindAll(bool trackChanges) =>
  !trackChanges ?_context.Set<TEntity>().AsNoTracking() : _context.Set<TEntity>();


   public IQueryable<TEntity> FindByCondition(Expression<Func<TEntity, bool>> expression,
 bool trackChanges) =>
 !trackChanges ?
 _context.Set<TEntity>()
 .Where(expression)
 .AsNoTracking() :
 _context.Set<TEntity>()
 .Where(expression);

  public void Create(TEntity entity) => _context.Set<TEntity>().Add(entity);
  public void Update(TEntity entity) => _context.Set<TEntity>().Update(entity);
  public void Delete(TEntity entity) => _context.Set<TEntity>().Remove(entity);
}