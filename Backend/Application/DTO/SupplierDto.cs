public class SupplierDto
{
    public Guid SupplierId { get; set; }

    public string Name { get; set; }

    public string? Email { get; set; }

    public string? Phone { get; set; }

    public string? Address { get; set; }
    
    // Optional: product summary list
 }
