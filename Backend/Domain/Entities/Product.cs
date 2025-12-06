using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Product
{
    [Key]
    public int Id { get; set; }

    [Required, MaxLength(150)]
    public string Name { get; set; }

    [MaxLength(250)]
    public string? Description { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    // [Range(0, 999999)]
    public decimal Price { get; set; }

    [Range(0, int.MaxValue)]
    public int StockQuantity { get; set; }

    // Category FK
    [ForeignKey(nameof(Category))]
    public int CategoryId { get; set; }
    public Category Category { get; set; }

    // Supplier FK
    [ForeignKey(nameof(Supplier))]
    public int SupplierId { get; set; }
    public Supplier Supplier { get; set; }

    // Relationships
    public ICollection<InvoiceItem> InvoiceItems { get; set; } 
    public ICollection<StockMovement> StockMovements { get; set; }
}
