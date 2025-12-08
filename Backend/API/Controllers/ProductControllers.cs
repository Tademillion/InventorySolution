using AutoMapper;
using Microsoft.AspNetCore.Mvc;

[Route("api/products")]
[ApiController]

public class PoductControllers : ControllerBase
{
 private  readonly ILogger<PoductControllers> _logger;
 private readonly IRepositoryManager _repository;
 private readonly IMapper _mapper;
  
 public PoductControllers(ILogger<PoductControllers> logger, IRepositoryManager repository, IMapper mapper)
 {
    _logger = logger;
    _repository = repository;
    _mapper = mapper;
 }

[HttpGet]
public async Task<IActionResult> GetAllProducts()
{
    var products = await _repository.Product.GetAllProductsAsync(trackChanges: false);
    return Ok(products);

} 

}