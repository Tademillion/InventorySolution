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

if (rule == null)
{
    rule = new SkuRule 
    { 
        IsActive = true, 
        CurrentSequence = 0, 
        Name=product.Name,
        Pattern = "{PREFIX}-{CATEGORY}-{SEQ:000000}" 
        
    };
    _context.SkuRules.Add(rule);
}

rule.CurrentSequence++;

var sku = rule.Pattern
    .Replace("{PREFIX}", "PRD")
    .Replace("{CATEGORY}", (product.Category?.Description ?? "GEN").PadRight(3).Substring(0, 3).ToUpper())
    .Replace("{SEQ:000000}", rule.CurrentSequence.ToString("000000"));

if (_context.Products.Any(p => p.Sku == sku))
{
    return Generate(product); 
}

_context.SaveChanges();
return sku;}
}
