public class Product
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Sku { get; set; } = default!;     
    public void AssignSku(string sku)
{
    if (!string.IsNullOrWhiteSpace(Sku))
        throw new InvalidOperationException("SKU already assigned");
    Sku = sku;
}
    public string Description { get; set; }
    public Guid CategoryId { get; set; }
    public Category Category { get; set; }
    public bool IsActive { get; set; }=true;
}