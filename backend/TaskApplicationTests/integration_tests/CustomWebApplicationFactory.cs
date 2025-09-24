using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Extensions.DependencyInjection;
using TaskApplication.repository;
using TaskApplication.service;
namespace TaskApplicationTests.integration_tests
{
    public class CustomWebApplicationFactory<TProgram>
    : WebApplicationFactory<TProgram> where TProgram : class
    {
        private readonly string _testConnectionString;

        public CustomWebApplicationFactory(string testConnectionString)
        {
            _testConnectionString = testConnectionString;
        }

        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.ConfigureServices(services =>
            {
                var userRepo = services.SingleOrDefault(s => s.ServiceType == typeof(IUserRepository));
                if (userRepo != null) services.Remove(userRepo);

                var taskRepo = services.SingleOrDefault(s => s.ServiceType == typeof(ITaskRepository));
                if (taskRepo != null) services.Remove(taskRepo);
   
                services.AddScoped<IUserRepository>(_ => new UserRepository(_testConnectionString));
                services.AddScoped<ITaskRepository>(_ => new TaskRepository(_testConnectionString));
            });

            builder.UseEnvironment("Development");
        }
    }
}
