public class SkuGenerator : ISkuGenerator
{
    private readonly ApplicationDBContext _context;

    public SkuGenerator(ApplicationDBContext context)
    {
        _context = context;
    }

    public string Generate(Product product)
    {
        var rule = _context.SkuRules.FirstOrDefault(r => r.IsActive);

        rule.CurrentSequence++;

        var sku = rule.Pattern
            .Replace("{PREFIX}", "PRD")
            .Replace("{CATEGORY}", product.Category.Description.Substring(0, 3).ToUpper())
            .Replace("{SEQ:000000}", rule.CurrentSequence.ToString("000000"));

        _context.SaveChanges();

        return sku;
    }
}
