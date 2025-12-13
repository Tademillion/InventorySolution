using System.ComponentModel.DataAnnotations;

public class CustomerDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
}
//  create customer dto
public class CreateCustomerDto
{
    [Required]
    [MaxLength(150)]
    public string Name { get; set; }

    [MaxLength(150)]
    public string? Email { get; set; }

    [MaxLength(100)]
    public string? Phone { get; set; }

    [MaxLength(250)]
    public string? Address { get; set; }
}
// update customer dto
public class UpdateCustomerDto
{
    [Required]
    [MaxLength(150)]
    public string Name { get; set; }

    [MaxLength(150)]
    public string? Email { get; set; }

    [MaxLength(100)]
    public string? Phone { get; set; }

    [MaxLength(250)]
    public string? Address { get; set; }
}