using AutoMapper;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/warehouses")]
public class WarehouseController : ControllerBase
{
    private readonly IRepositoryManager _repository;
    private readonly IMapper _mapper;
    private ILogger<WarehouseController> _logger;
    
    public WarehouseController(IRepositoryManager repository, IMapper mapper, ILogger<WarehouseController> logger)
    {
        _repository = repository;
        _mapper = mapper;
        _logger = logger;
    }

    // Controller actions go here
    [HttpGet]
    public async Task<IActionResult> GetAllWarehouses()
    {
        var warehouses = await _repository.Warehouse.GetAllAsync(trackChanges: false);
        var warehousesDto = _mapper.Map<IEnumerable<WareHouseDto>>(warehouses);
        return Ok(warehousesDto);
    }
    //  get by id
    [HttpGet("{id}", Name = "GetWarehouseById")]
    public async Task<IActionResult> GetWarehouseById(Guid id)
    {
        var warehouse = await _repository.Warehouse.GetByIdAsync(id, trackChanges: false);
        if (warehouse == null)
        {
            return NotFound();
        }
        var warehouseDto = _mapper.Map<WareHouseDto>(warehouse);
        return Ok(warehouseDto);
    }   
    //  post
    [HttpPost]
    public async Task<IActionResult> CreateWarehouse([FromBody] WareHouseCreationDto warehouseCreationDto)
    {
        var warehouseEntity = _mapper.Map<Warehouse>(warehouseCreationDto);
    //     before that generate code
        var generatedCode = await _repository.WarehouseCodeGenerator.GenerateAsync(warehouseCreationDto.Address);
        warehouseEntity.AssignCode(generatedCode);
        _logger.LogInformation($"Generated warehouse code: {generatedCode}");

         _repository.Warehouse.AddAsync(warehouseEntity);
        await _repository.SaveAsync();

        var warehouseToReturn = _mapper.Map<WareHouseDto>(warehouseEntity);
        return CreatedAtRoute("GetWarehouseById", new { id = warehouseToReturn.Id }, warehouseToReturn);
    }
}