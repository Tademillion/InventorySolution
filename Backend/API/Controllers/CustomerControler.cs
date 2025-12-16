using AutoMapper;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/customers")]
public class CustomerController:ControllerBase
{        

    private readonly ILogger<CustomerController> _logger;
    private readonly IRepositoryManager _repository;
    private readonly IMapper _mapper;

    public CustomerController(ILogger<CustomerController> logger, IRepositoryManager repository, IMapper mapper)
    {
        _logger = logger;
        _repository = repository;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllCustomers()
    {
        var customers = await _repository.Customer.GetAllCustomersAsync(trackChanges: false);
        return Ok(customers);
    }

    [HttpGet("{id}", Name = "GetCustomerById")]
    public async Task<IActionResult> GetCustomerById(Guid id)
    {
        var customer = await _repository.Customer.GetCustomerAsync(id, trackChanges: false);
        if (customer == null)
        {
            return NotFound();
        }
        return Ok(customer);
    }
    //  post
    [HttpPost]
    public async Task<IActionResult> CreateCustomer([FromBody] CreateCustomerDto createCustomerDto)
    {
        var customerEntity = _mapper.Map<Customer>(createCustomerDto);
        _repository.Customer.CreateCustomer(customerEntity);
        await _repository.SaveAsync();
        var customerToReturn = _mapper.Map<CustomerDto>(customerEntity);
        return CreatedAtRoute("GetCustomerById", new { id = customerToReturn.Id }, customerToReturn); 
    }
}