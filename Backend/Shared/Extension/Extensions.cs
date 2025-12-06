using Microsoft.EntityFrameworkCore;

public static class ServiceExtensions
{
   public static void ConfigureCors(this IServiceCollection services)
    {
 
        services.AddCors(options =>
        {
            options.AddPolicy("CorsPolicy", builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader()
                       .AllowCredentials();
            });
        });
    }
    public static void ConfigureSqlContext(this IServiceCollection services,  
IConfiguration configuration) => 
services.AddDbContext<ApplicationDBContext>(opts => 
opts.UseSqlServer(configuration.GetConnectionString("DefaultConnection"))); 
}