using System.ComponentModel.DataAnnotations;

public class ProductInventoryDto
{
    public Guid ProductId { get; set; }

    public string ProductName { get; set; }
    public  string CategoryName {get;set;}

    public string? Description { get; set; }

    public decimal Price { get; set; }
    public decimal Cost {get;set;}

    public int StockQuantity { get; set; }
 

    public Guid SupplierId { get; set; }
    public string SupplierName { get; set; }
 
    public Guid WareHouseId {get;set;}
    public string WarehouseName {get;set;}
    
}


public class CreateProductInventoryDto
{
     public Guid ProductId { get; set; } 

    [Required]
    [Range(0, 999999)]
    public decimal Price { get; set; }
    public decimal Cost {get;set;}

    [Required]
    [Range(0, int.MaxValue)]
    public int StockQuantity { get; set; } 
 
    [Required]
    public Guid SupplierId { get; set; }
    [Required]
    public Guid WarehouseId {get;set;}
}

public class UpdateProductInventoryDto
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
// 
public class ProductInventoryListDto
{
    public int ProductId { get; set; }

    public string Name { get; set; }

    public decimal Price { get; set; }

    public int StockQuantity { get; set; }

    public string CategoryName { get; set; }

    public string SupplierName { get; set; }
}


