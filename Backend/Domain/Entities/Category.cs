using System.ComponentModel.DataAnnotations;

public class Category
{
    [Key]
    public Guid CategoryId { get; set; } 
    [Required, MaxLength(100)]
    public string Name { get; set; } 
    [MaxLength(250)]
    public string? Description { get; set; } 
    // Relationships
    public ICollection<Product> Products { get; set; } = new List<Product>();
}