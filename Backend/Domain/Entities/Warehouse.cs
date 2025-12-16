using System.ComponentModel.DataAnnotations;

public class Warehouse
{
    [Key]
    public Guid Id { get; set; }

    [Required, MaxLength(20)]
    public string Code { get; set; } = default!;

    [Required, MaxLength(150)]
    public string Name { get; set; } = default!;

    [MaxLength(500)]
    public string? Description { get; set; }

    [MaxLength(250)]
    public string? Address { get; set; }

    [MaxLength(100)]
    public string? City { get; set; }

    [MaxLength(100)]
    public string? Country { get; set; }

    public bool IsActive { get; set; } = true;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // 🔗 Navigation Properties
    public ICollection<Product> Products { get; set; } = new List<Product>();
    public ICollection<StockMovement> StockMovements { get; set; } = new List<StockMovement>();
}
