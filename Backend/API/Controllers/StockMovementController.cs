using AutoMapper;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/stockmovements")]
public class StockMovementController : ControllerBase
{
    private readonly IRepositoryManager _repository;
    private readonly IMapper _mapper;

    public StockMovementController(IRepositoryManager repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

    // Controller actions here
    [HttpGet]

    public async Task<IActionResult> GetAllStockMovements()
    {
        var stockMovements = await _repository.StockMovement.GetAllStockMovementsAsync(trackChanges: false);
        var stockMovementsDto = _mapper.Map<IEnumerable<StockMovementDto>>(stockMovements);
        return Ok(stockMovementsDto);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetStockMovement(Guid id)
    {
        var stockMovement = await _repository.StockMovement.GetStockMovementAsync(id, trackChanges: false);
        if (stockMovement == null)
            return NotFound();

        var stockMovementDto = _mapper.Map<StockMovementDto>(stockMovement);
        return Ok(stockMovementDto);
    }

    [HttpPost]
    public async Task<IActionResult> CreateStockMovement([FromBody] CreateStockMovementDto createStockMovementDto)
    {
        var stockMovement = _mapper.Map<StockMovement>(createStockMovementDto);
        _repository.StockMovement.CreateStockMovement(stockMovement);
        await _repository.SaveAsync();
        return CreatedAtRoute("GetStockMovement", new { id = stockMovement.ProductId }, stockMovement);
    }

}