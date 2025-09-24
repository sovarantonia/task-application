using Castle.DynamicProxy;
using TaskApplication.entity;
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
            services.AddSingleton(new List<Type> { typeof(TaskAuthorizationAttribute) });

            services.AddScoped<ICurrentUser, CurrentUserFromCookie>();

            services.AddSingleton<ProxyGenerator>();
            
            services.AddScoped<TaskInterceptor>();

            services.AddScoped<TaskService>();

            services.AddScoped<ITaskService>(s =>
            {
                var generator = s.GetRequiredService<ProxyGenerator>();
                var attrTypes = s.GetRequiredService<List<Type>>();

                var option = new ProxyGenerationOptions (new ValidateAttributeHook(attrTypes));
                var target = s.GetRequiredService<TaskService>();
                var interceptor = s.GetRequiredService<TaskInterceptor>();

                return generator.CreateInterfaceProxyWithTarget<ITaskService>(target, options: option, interceptor);

            });

            return services;
        }
    }
}
