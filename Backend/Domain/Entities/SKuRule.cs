using System.ComponentModel.DataAnnotations;

public class SkuRule
{
    public Guid Id { get; set; }

    [Required, MaxLength(50)]
    public string Name { get; set; } = default!;

    [Required]
    public string Pattern { get; set; } = default!;
    // Example: "{PREFIX}-{CATEGORY}-{SEQ:000000}"

    public int CurrentSequence { get; set; }

    public bool IsActive { get; set; } = true;
}
