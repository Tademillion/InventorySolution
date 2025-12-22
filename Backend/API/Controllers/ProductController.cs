using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/products")]
public class ProductController:ControllerBase
{
 
 private readonly  IRepositoryManager _repository;
 private ILogger<ProductController> _logger;
 private readonly ISkuGenerator _generator;
   
   private IMapper _mapper;
 public ProductController(IRepositoryManager repository,ILogger<ProductController> logger,IMapper mapper,ISkuGenerator generator)
 {
     _repository = repository;
     _logger=logger;
     _mapper=mapper;
     _generator=generator;
 }
//   get all  products 
    [HttpGet]
    public async Task<IActionResult> GetProducts()
    {
        
         var product= await _repository.Product.GetAllProductsAsync(false);
        return Ok(product);
    }
    //  get  the Products by id only
[HttpGet("{id}", Name = "GetProductById")]
public async Task<IActionResult> GetproductById(Guid id)
    {
        var product= await _repository.Product.GetProductByIdAsync(id,false);
        var mappedDto= _mapper.Map<ProductResponseDto>(product);
        return Ok(mappedDto);
    }

    [HttpPost]
public async Task<IActionResult> CreateProduct([FromBody] CreateProductDto product)
    {
        var productEntity= _mapper.Map<Product>(product);
        _repository.Product.CreateProduct(productEntity);
        //  assign the SKu
         var Sku=_generator.Generate(productEntity);
         productEntity.AssignSku(Sku);
    var productToReturn = _mapper.Map<ProductInventoryDto>(productEntity);
    return CreatedAtRoute("GetProductById", new { id = productToReturn.ProductId }, productToReturn); 
    }
    //  update we can continue
    }