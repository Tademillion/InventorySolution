using System.ComponentModel.DataAnnotations;

//  create caetogory dto
public class CreateCategoryDto
{
    [Required]
    [MaxLength(100)]
    public string Name { get; set; }

    [MaxLength(250)]
    public string? Description { get; set; }
}
//  update dto
public class UpdateCategoryDto
{
    [Required]
    [MaxLength(100)]
    public string Name { get; set; }

    [MaxLength(250)]
    public string? Description { get; set; }
}

//  response category dto
public class CategoryDto
{
    public int CategoryId { get; set; }
    public string Name { get; set; }
    public string? Description { get; set; }
}