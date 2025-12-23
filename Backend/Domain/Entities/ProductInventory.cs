using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class ProductInventory
{
    [Key]
    public Guid ProductId { get; set; }
    public Product Product {get;set;}=default!;
   

    [Required]
    public decimal Price { get; set; }

    [Required]
    public decimal Cost { get; set; }

    [Required]
    public int Stock { get; set; }

    public int ReorderLevel { get; set; }
    public int ReorderQuantity { get; set; }

    [Required]
    public string Unit { get; set; } = "pcs";

    public bool HasBatchTracking { get; set; }
    public bool HasExpiryTracking { get; set; }

    public string? Barcode { get; set; }
    public string? ImageUrl { get; set; }

    public bool IsActive { get; set; } = true;

    // 🔗 Relationships
  
    public Guid SupplierId { get; set; }
    public Supplier Supplier { get; set; } = default!;

    public Guid WarehouseId { get; set; }
    public Warehouse Warehouse { get; set; } = default!;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<StockMovement> StockMovements { get; set; } = new List<StockMovement>();
}
