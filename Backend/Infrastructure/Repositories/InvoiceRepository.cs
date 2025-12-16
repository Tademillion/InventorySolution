using Microsoft.EntityFrameworkCore;

public class InvoiceRepository : RepositoryBase<Invoice>, IInvoiceRepository
{
    public InvoiceRepository(ApplicationDBContext context)
        : base(context)
    {
    }

    public void CreateInvoice(Invoice invoice)
    {
        throw new NotImplementedException();
    }

    public async Task<IEnumerable<Invoice>> GetAllInvoicesAsync(bool trackChanges)
        => await FindAll(trackChanges).ToListAsync();

    public Task<IEnumerable<Invoice>> GetByIdAsync(Guid ids, bool trackChanges)
    {
        throw new NotImplementedException();
    }

    public async Task<Invoice> GetInvoiceAsync(Guid invoiceId, bool trackChanges)
        => await FindByCondition(i => i.InvoiceId == invoiceId, trackChanges)
        .SingleOrDefaultAsync();

}