using AutoMapper;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/invoices")]

public class InvoiceController : ControllerBase
{
    private readonly IRepositoryManager _repository;
    private readonly IMapper _mapper;

    public InvoiceController(IRepositoryManager repository, IMapper mapper)
    {
        _repository = repository;
        _mapper = mapper;
    }

//  get all
    [HttpGet]
    public async Task<IActionResult> GetAllInvoices()
    {
        var invoices = await _repository.Invoice.GetAllInvoicesAsync(trackChanges: false);
        return Ok(invoices);
    }
    //  get by id
    [HttpGet("{id}", Name = "GetInvoiceById")]
    public async Task<IActionResult> GetInvoiceById(Guid id)
    {
        var invoice = await _repository.Invoice.GetInvoiceAsync(id, trackChanges: false);
        if (invoice == null)
        {
            return NotFound();
        }
        return Ok(invoice);
    }
    [HttpPost]
    public async Task<IActionResult> CreateInvoice([FromBody] CreateInvoiceDto createInvoiceDto)
    {
        var invoiceEntity = _mapper.Map<Invoice>(createInvoiceDto);
        _repository.Invoice.CreateInvoice(invoiceEntity);
        await _repository.SaveAsync();
        var invoiceToReturn = _mapper.Map<InvoiceDto>(invoiceEntity);
        return CreatedAtRoute("GetInvoiceById", new { id = invoiceToReturn.InvoiceId }, invoiceToReturn); 
    }
    // 
}