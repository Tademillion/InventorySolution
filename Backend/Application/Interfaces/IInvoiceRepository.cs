public interface IInvoiceRepository
{
    Task<IEnumerable<Invoice>> GetAllInvoicesAsync(bool trackChanges);
    Task<Invoice> GetInvoiceAsync(Guid invoiceId, bool trackChanges);
    Task<IEnumerable<Invoice>> GetByIdAsync(Guid ids, bool trackChanges);
    void CreateInvoice(Invoice invoice);
}