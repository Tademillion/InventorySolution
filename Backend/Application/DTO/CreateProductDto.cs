using System.ComponentModel.DataAnnotations;

public class CreateProductDto
{
    [Required, MaxLength(150)]
    public string Name { get; set; }

    [MaxLength(250)]
    public string? Description { get; set; }

    [Required]
    [Range(0, 999999)]
    public decimal Price { get; set; }

    [Required]
    [Range(0, int.MaxValue)]
    public int StockQuantity { get; set; }

    [Required]
    public int CategoryId { get; set; }

    [Required]
    public int SupplierId { get; set; }
}
