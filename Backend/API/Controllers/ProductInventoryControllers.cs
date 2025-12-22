using AutoMapper;
using Microsoft.AspNetCore.Mvc;

[Route("api/productinventory")]
[ApiController]

public class PoductInventoryController : ControllerBase
{
 private  readonly ILogger<PoductInventoryController> _logger;
 private readonly IRepositoryManager _repository;
 private readonly IMapper _mapper;
  
 public PoductInventoryController(ILogger<PoductInventoryController> logger, IRepositoryManager repository, IMapper mapper)
 {
    _logger = logger;
    _repository = repository;
    _mapper = mapper;
 }

[HttpGet]
public async Task<IActionResult> GetAllProductInventories()
{
    var products = await _repository.ProductInventory.GetAllProductInventoryAsync(trackChanges: false);
    return Ok(products);

} 
[HttpGet("{id}", Name = "GetProductInventoryById")]
public async Task<IActionResult> GetProductInventoryById(Guid id)
{
    var product = await _repository.ProductInventory.GetByIdsAsync(id, trackChanges: false);
    if (product == null)
    {
        return NotFound();
    }
    return Ok(product);
}
//  post
[HttpPost]
public async Task<IActionResult> CreateProductInventory([FromBody] CreateProductInventoryDto productInventoryDto)
{
    var productEntity = _mapper.Map<ProductInventory>(productInventoryDto);
    _repository.ProductInventory.CreateProductInventory(productEntity);
    await _repository.SaveAsync();
    var productToReturn = _mapper.Map<ProductInventoryDto>(productEntity);
    return CreatedAtRoute("GetProductInventoryById", new { id = productToReturn.ProductId }, productToReturn); 
}
}