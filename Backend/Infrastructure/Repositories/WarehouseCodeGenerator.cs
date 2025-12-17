using Microsoft.EntityFrameworkCore;

public class WarehouseCodeGenerator : IWarehouseCodeGenerator
{
    private readonly ApplicationDBContext _context;

    public WarehouseCodeGenerator(ApplicationDBContext context)
    {
        _context = context;
    }

    public async Task<string> GenerateAsync(string? locationCode = null)
    {
        var prefix = "WH";

        if (!string.IsNullOrWhiteSpace(locationCode))
            prefix += $"-{locationCode
           .Trim()
           .ToUpper()
           .Substring(0, 5)  
           }";

        var lastCode = await _context.Warehouses
            .Where(w => w.Code.StartsWith(prefix))
            .OrderByDescending(w => w.CreatedAt)
            .Select(w => w.Code)
            .FirstOrDefaultAsync();

        var nextNumber = 1;

        if (lastCode != null)
        {
            var parts = lastCode.Split('-');
            var lastNumber = int.Parse(parts[^1]);
            nextNumber = lastNumber + 1;
        }

        return $"{prefix}-{nextNumber:D3}";
    }
}
