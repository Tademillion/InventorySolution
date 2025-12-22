using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/products")]
public class ProductController:ControllerBase
{
 
 private readonly  IRepositoryManager _repository;
   
 public ProductController(IRepositoryManager repository)
 {
     _repository = repository;
     
 }
    public IActionResult GetProducts()
    {
        
        // Implementation for getting products
        return Ok();
    }
   
}