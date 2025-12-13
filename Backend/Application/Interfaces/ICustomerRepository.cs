public interface ICustomerRepository
{
    Task<IEnumerable<Customer>> GetAllCustomersAsync(bool trackChanges);
    Task<Customer> GetCustomerAsync(int customerId, bool trackChanges);
    Task<IEnumerable<Customer>> GetByIdAsync(int ids, bool trackChanges); 
    void CreateCustomer(Customer customer);  

}