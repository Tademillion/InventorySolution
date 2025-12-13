public interface IInvoiceRepository
{
    Task<IEnumerable<Invoice>> GetAllInvoicesAsync(bool trackChanges);
    Task<Invoice> GetInvoiceAsync(int invoiceId, bool trackChanges);
    Task<IEnumerable<Invoice>> GetByIdAsync(int ids, bool trackChanges);
    void CreateInvoice(Invoice invoice);
}