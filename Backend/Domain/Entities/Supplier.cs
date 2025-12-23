using System.ComponentModel.DataAnnotations;

public class Supplier
{
    [Key]
    public Guid SupplierId { get; set; } 
    [Required, MaxLength(150)]
    public string Name { get; set; } 
    [MaxLength(150)]
    public string? Email { get; set; } 
    [MaxLength(100)]
    public string? Phone { get; set; } 
    [MaxLength(250)]
    public string? Address { get; set; } 
    // Relationships
 }