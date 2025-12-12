using AutoMapper;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/categories")]
public class CategoryController : ControllerBase
{
    private readonly ILogger<CategoryController> _logger;
    private readonly IRepositoryManager _repository;
    private readonly IMapper _mapper;

    public CategoryController(ILogger<CategoryController> logger, IRepositoryManager repository, IMapper mapper)
    {
        _logger = logger;
        _repository = repository;
        _mapper = mapper;
    }
    
    [HttpGet]
    public async Task<IActionResult> GetAllCategories()
    {
        var categories = await _repository.Category.GetAllCategoriesAsync(trackChanges: false);
        return Ok(categories);
    }

}