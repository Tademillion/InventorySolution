public class WareHouseDto
{
    public Guid Id { get; set; }
    public string Code { get; set; } = default!;
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
    public string? Address { get; set; }
    public string? City { get; set; }
    public string? Country { get; set; }
    public bool IsActive { get; set; } = true;
    public int? Capacity { get; set; }
    public string? ManagerId { get; set; }
    public string? ManagerName { get; set; }
    public int? CurrentUtilization { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
}
//  create warehosue dto with capacity, managerId, managerName, currentUtilization
public class WareHouseCreationDto
{
    public string Code { get; set; } = default!;
    public string Name { get; set; } = default!;
    public string? Description { get; set; }
    public string? Address { get; set; }
    public string? City { get; set; }
    public string? Country { get; set; }
    public bool IsActive { get; set; } = true;
    public int? Capacity { get; set; }
    public string? ManagerId { get; set; }
    public string? ManagerName { get; set; }
}