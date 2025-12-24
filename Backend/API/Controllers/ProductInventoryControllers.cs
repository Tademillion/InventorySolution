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
    var preoductEntity= _mapper.Map<List<ProductInventoryDto>>(products);
     return Ok(preoductEntity);

} 
[HttpGet("{id}", Name = "GetProductInventoryById")]
public async Task<IActionResult> GetProductInventoryById(int id)
{
     var product = await _repository.ProductInventory.GetByIdsAsync(id, trackChanges: false);
      _logger.LogInformation("the productis"+product);  
    if (product == null)
    {
        return NotFound();
    }
    //  mapp the response 
     var productEntity= _mapper.Map<ProductInventoryDto>(product);
    return Ok(productEntity);
}
//  post
[HttpPost]
public async Task<IActionResult> CreateProductInventory([FromBody] CreateProductInventoryDto productInventoryDto)
{
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
    var productEntity = _mapper.Map<ProductInventory>(productInventoryDto);
    // assign the SKU
_logger.LogInformation(productEntity+"");
          _logger.LogInformation("the product to create is"+productEntity);
       _repository.ProductInventory.CreateProductInventory(productEntity);
    await _repository.SaveAsync();
    var productToReturn = _mapper.Map<ProductInventoryDto>(productEntity);
    return Ok(productToReturn);
    // return CreatedAtRoute("GetProductInventoryById", new { id = productToReturn.Id }, productToReturn); 
}
}