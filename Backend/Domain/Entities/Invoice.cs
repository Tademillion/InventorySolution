public class Product
{
    public Guid Id { get; set; }
    public string Name { get; set; } = default!;
    public decimal Price { get; set; }
    public int Quantity { get; private set; }
    public Guid CategoryId { get; set; }
    public Category Category { get; set; } = default!;
    public void AddStock(int amount) => Quantity += amount; 
    public void ReduceStock(int amount)
    {
        if (amount > Quantity)
            throw new Exception("Not enough stock"); 
        Quantity -= amount;
    }
}
