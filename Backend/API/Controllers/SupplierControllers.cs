using AutoMapper;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/suppliers")]
public class SupplierControllers : ControllerBase
{
    private readonly ILogger<SupplierControllers> _logger;
    private readonly IRepositoryManager _repository;
    private readonly IMapper _mapper;

    public SupplierControllers(ILogger<SupplierControllers> logger, IRepositoryManager repository, IMapper mapper)
    {
        _logger = logger;
        _repository = repository;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllSuppliers()
    {
        var suppliers = await _repository.Supplier.GetAllSuppliersAsync(trackChanges: false);
        return Ok(suppliers);
    }

    [HttpGet("{id}", Name = "GetSupplierById")]
    public async Task<IActionResult> GetSupplierById(int id)
    {
        var supplier = await _repository.Supplier.GetSupplierAsync(id, trackChanges: false);
        if (supplier == null)
        {
            return NotFound();
        }
        return Ok(supplier);
    }

    // post
    [HttpPost]
    public async Task<IActionResult> CreateSupplier([FromBody] SupplierCreateDto createSupplierDto)
    {
        var supplierEntity = _mapper.Map<Supplier>(createSupplierDto);
        _repository.Supplier.CreateSupplier(supplierEntity);
        await _repository.SaveAsync();
        var supplierToReturn = _mapper.Map<SupplierDto>(supplierEntity);
        return CreatedAtRoute("GetSupplierById", new { id = supplierToReturn.SupplierId }, supplierToReturn);
    
     }
    //   update
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateSupplier(int id, [FromBody] SupplierUpdateDto supplierDto)
    {
        var supplierEntity = await _repository.Supplier.GetSupplierAsync(id, trackChanges: true);
        _logger.LogInformation($"Updating supplier with ID: {supplierEntity.Address}");
        if (supplierEntity == null)
        {
            return NotFound();
        }
        _mapper.Map(supplierDto, supplierEntity);
        await _repository.SaveAsync();
        return NoContent();
    }
}