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
[HttpGet("{id}", Name = "GetProductById")]
public async Task<IActionResult> GetProductById(Guid id)
{
    var product = await _repository.Product.GetByIdsAsync(id, trackChanges: false);
    if (product == null)
    {
        return NotFound();
    }
    return Ok(product);
}
//  post
[HttpPost]
public async Task<IActionResult> CreateProduct([FromBody] CreateProductDto createProductDto)
{
    var productEntity = _mapper.Map<Product>(createProductDto);
    _repository.Product.CreateProduct(productEntity);
    await _repository.SaveAsync();
    var productToReturn = _mapper.Map<ProductDto>(productEntity);
    return CreatedAtRoute("GetProductById", new { id = productToReturn.ProductId }, productToReturn); 
}
}