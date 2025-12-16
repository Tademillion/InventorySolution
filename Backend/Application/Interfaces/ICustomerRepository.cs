public interface ICustomerRepository
{
    Task<IEnumerable<Customer>> GetAllCustomersAsync(bool trackChanges);
    Task<Customer> GetCustomerAsync(Guid customerId, bool trackChanges);
    Task<IEnumerable<Customer>> GetByIdAsync(Guid ids, bool trackChanges); 
    void CreateCustomer(Customer customer);  

}