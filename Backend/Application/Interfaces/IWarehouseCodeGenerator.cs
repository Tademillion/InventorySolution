public interface IWarehouseCodeGenerator
{
    Task<string> GenerateAsync(string? locationCode = null);
}