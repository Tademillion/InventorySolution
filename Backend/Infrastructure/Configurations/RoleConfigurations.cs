using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

public class RoleConfigurations : IEntityTypeConfiguration<IdentityRole>
{
    public void Configure(EntityTypeBuilder<IdentityRole> builder)
    {
        builder.HasData(
            new IdentityRole
            {
                Name = "Admin",
                NormalizedName = "ADMIN"
            },
            new IdentityRole
            {
                Name = "Auditor",
                NormalizedName = "AUDITOR"
            },
             new IdentityRole
            {
                Name = "Cashier",
                NormalizedName = "CASHIER"
            }
        );
    }
}