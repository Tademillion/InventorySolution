using System.ComponentModel.DataAnnotations;

public class InvoiceDto
{
    public int InvoiceId { get; set; }
    public DateTime InvoiceDate { get; set; }
    public decimal TotalAmount { get; set; }
    public int CustomerId { get; set; }
}
// create invoice dto
public class CreateInvoiceDto
{
    [Required]
    public DateTime InvoiceDate { get; set; } = DateTime.UtcNow;

    [Required]
    [Range(0, 99999999)]
    public decimal TotalAmount { get; set; }

    [Required]
    public int CustomerId { get; set; }
}
// update invoice dto
public class UpdateInvoiceDto
{
    [Required]
    public DateTime InvoiceDate { get; set; } = DateTime.UtcNow;

    [Required]
    [Range(0, 99999999)]
    public decimal TotalAmount { get; set; }

    [Required]
    public int CustomerId { get; set; }
}
