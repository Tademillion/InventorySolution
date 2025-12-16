using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class StockMovement
{
    [Key]
    public Guid StockMovementId { get; set; }

    [Required]
    public DateTime MovementDate { get; set; } = DateTime.UtcNow;

    [Required]
    public int Quantity { get; set; } // Positive or negative

    [Required, MaxLength(50)]
    public string MovementType { get; set; } // Purchase, Sale, Adjustment

    [MaxLength(250)]
    public string? Notes { get; set; }

    // Product FK
    [ForeignKey(nameof(Product))]
    public int ProductId { get; set; }
    public Product Product { get; set; }
}
