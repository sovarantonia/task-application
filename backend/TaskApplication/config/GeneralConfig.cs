using Microsoft.Extensions.Options;
using TaskApplication.entity;
using TaskApplication.filter_midw;

namespace TaskApplication.config
{
    public static class GeneralConfig
    {
        public static IServiceCollection AddAuthorizedEmails(this IServiceCollection services, IConfiguration configuration)
        {
            services.Configure<AuthorizedEmails>(configuration.GetSection("Access"));
            services.AddSingleton(s =>
                s.GetRequiredService<IOptions<AuthorizedEmails>>().Value);

            return services;
        }

        public static IServiceCollection AddCurrentUser(this IServiceCollection services)
        {
            services.AddScoped<CurrentUserFromCookie>();

            return services;
        }

        public static IServiceCollection AddHttpConfig(this IServiceCollection services, string MyAllowSpecificOrigins)
        {
            services.AddHttpContextAccessor();
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                                  policy =>
                                  {
                                      policy
                                      .WithOrigins("http://127.0.0.1:8080", "http://localhost:4200", "http://localhost:8080")
                                      .AllowAnyHeader()
                                      .AllowAnyMethod()
                                      .AllowCredentials();
                                  });
            });


            return services;
        }

        public static IServiceCollection AddFilter(this IServiceCollection services)
        {
            services.AddControllers(o => { o.Filters.Add<ExceptionFilter>(); });
            services.AddScoped<ExceptionFilter>();

            return services;
        }
    }
}
