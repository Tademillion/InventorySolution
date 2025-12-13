using System.ComponentModel.DataAnnotations;

public class StockMovementDto
{
    public int Id { get; set; }
    public int ProductId { get; set; }
    public DateTime MovementDate { get; set; }
    public int Quantity { get; set; }
    public string MovementType { get; set; } // Purchase, Sale, Adjustment
    public string? Notes { get; set; }
}
//  create dto
public class CreateStockMovementDto
{
    [Required]
    public int ProductId { get; set; }

    [Required]
    public DateTime MovementDate { get; set; } = DateTime.UtcNow;

    [Required]
    public int Quantity { get; set; } // Positive or negative

    [Required, MaxLength(50)]
    public string MovementType { get; set; } // Purchase, Sale, Adjustment

    [MaxLength(250)]
    public string? Notes { get; set; }
}
// update dto
public class UpdateStockMovementDto
{
    [Required]
    public int ProductId { get; set; }

    [Required]
    public DateTime MovementDate { get; set; } = DateTime.UtcNow;

    [Required]
    public int Quantity { get; set; } // Positive or negative

    [Required, MaxLength(50)]
    public string MovementType { get; set; } // Purchase, Sale, Adjustment

    [MaxLength(250)]
    public string? Notes { get; set; }
}