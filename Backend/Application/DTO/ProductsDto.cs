using System.ComponentModel.DataAnnotations;

public class CreateProductDto
{
    [Required, MaxLength(150)]
    public string Name { get; set; } = default!;

    [MaxLength(500)]
    public string? Description { get; set; }

    [Required]
    public Guid CategoryId { get; set; }
}

//  update dto
public class UpdateProductDto
{
    [Required, MaxLength(150)]
    public string Name { get; set; } = default!;

    [MaxLength(500)]
    public string? Description { get; set; }

    [Required]
    public int CategoryId { get; set; }

    public bool IsActive { get; set; }
}
// product dto
public class ProductResponseDto
{
    public Guid Id { get; set; }

    public string Name { get; set; } = default!;
    public string Sku { get; set; } = default!;

    public string? Description { get; set; }

    public Guid CategoryId { get; set; }
    public string CategoryName { get; set; } = default!;

    public bool IsActive { get; set; }
}

//  
 