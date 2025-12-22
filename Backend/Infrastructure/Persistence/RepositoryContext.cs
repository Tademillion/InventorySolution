using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class ApplicationDBContext : IdentityDbContext<User>
{
    public ApplicationDBContext(DbContextOptions options) : base(options)
    {
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfiguration(new RoleConfigurations());
    }
    public DbSet<ProductInventory> ProductInventory { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Supplier> Suppliers { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Invoice> Invoices { get; set; }
    public DbSet<InvoiceItem> InvoiceItems { get; set; }
    public DbSet<StockMovement> StockMovements { get; set; }
    public DbSet<Warehouse> Warehouses { get; set; }
    public DbSet<SkuRule> SkuRules { get; set; }
    public DbSet<Product> Products { get; set; }
    
  }