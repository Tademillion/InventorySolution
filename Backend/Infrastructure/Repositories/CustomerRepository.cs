using Microsoft.EntityFrameworkCore;

public class CustomerRepository: RepositoryBase<Customer>, ICustomerRepository
{
    public CustomerRepository(ApplicationDBContext context)
        : base(context)
    {
    }

    public async Task<IEnumerable<Customer>> GetAllCustomersAsync(bool trackChanges) =>
        await FindAll(trackChanges)
        .OrderBy(c => c.Name)
        .ToListAsync();

    public async Task<Customer> GetCustomerAsync(int customerId, bool trackChanges) =>
        await FindByCondition(c => c.CustomerId.Equals(customerId), trackChanges)
        .SingleOrDefaultAsync();

    public async Task<IEnumerable<Customer>> GetByIdAsync(int ids, bool trackChanges)=>
        await FindByCondition(c => c.CustomerId == ids, trackChanges)
        .ToListAsync(); 
        public void CreateCustomer(Customer customer) => Create(customer); 

}

