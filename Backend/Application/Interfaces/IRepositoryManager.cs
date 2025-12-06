public interface IRepositoryManager
{
        public IProductRepository Product { get; }
         Task SaveAsync();
}