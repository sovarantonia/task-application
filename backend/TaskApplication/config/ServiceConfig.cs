using Castle.DynamicProxy;
using TaskApplication.filter_midw;
using TaskApplication.repository;
using TaskApplication.service;

namespace TaskApplication.config
{
    public static class ServiceConfig
    {
        public static IServiceCollection AddService(this IServiceCollection services)
        {
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ITaskRepository, TaskRepository>();
            services.AddScoped<IUserService, UserService>();

            return services;
        }

        public static IServiceCollection AddTaskService(this IServiceCollection services)
        {
            services.AddSingleton<ProxyGenerator>();
            services.AddScoped<TaskInterceptor<TaskAuthorizationAttribute>>();

            services.AddScoped<TaskService>();

            services.AddScoped<ITaskService>(s =>
            {
                var generator = s.GetRequiredService<ProxyGenerator>();
                var target = s.GetRequiredService<TaskService>();
                var interceptor = s.GetRequiredService<TaskInterceptor<TaskAuthorizationAttribute>>();

                return generator.CreateInterfaceProxyWithTarget<ITaskService>(target, interceptor);

            });

            return services;
        }
    }
}
