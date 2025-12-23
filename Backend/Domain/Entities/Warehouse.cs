using System.ComponentModel.DataAnnotations;

public class Warehouse
{
    [Key]
    public Guid Id { get; set; }

    [Required, MaxLength(20)]
    public string Code { get; set; } = default!;
       public void AssignCode(string code)
{
    if (!string.IsNullOrWhiteSpace(Code))
        throw new InvalidOperationException("Code already assigned");

    Code = code;
}

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
    public int? Capacity { get; set; }
    public string? ManagerId { get; set; }
    public string? ManagerName { get; set; }
    public int? CurrentUtilization { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    // 🔗 Navigation Properties
     public ICollection<StockMovement> StockMovements { get; set; } = new List<StockMovement>();
}
