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
    //  category by dto
    [HttpGet("{id}", Name = "GetCategoryById")]
    public async Task<IActionResult> GetCategoryById(int id)
    {
        var category = await _repository.Category.GetByIdAsync(id, trackChanges: false);
        if (category == null)
        {
            return NotFound();
        }
        return Ok(category);
    }
    //  create 
    [HttpPost]
    public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryDto createCategoryDto)
    {
        var categoryEntity = _mapper.Map<Category>(createCategoryDto);
        _repository.Category.CreateCategory(categoryEntity);
        await _repository.SaveAsync();
        var categoryToReturn = _mapper.Map<CategoryDto>(categoryEntity);
        return CreatedAtRoute("GetCategoryById", new { id = categoryToReturn.CategoryId }, categoryToReturn);
}
}