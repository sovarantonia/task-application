using Castle.DynamicProxy;
using TaskApplication.entity;
using TaskApplication.filter_midw;
using TaskApplication.repository;
using TaskApplication.service;

var MyAllowSpecificOrigins = "MyAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddHttpContextAccessor();

builder.Services.Configure<AuthorizedEmails>(builder.Configuration.GetSection("Access"));
builder.Services.AddSingleton(s =>
    s.GetRequiredService<Microsoft.Extensions.Options.IOptions<AuthorizedEmails>>().Value);
builder.Services.AddScoped<CurrentUserFromCookie>();
builder.Services.AddSingleton<ProxyGenerator>();
builder.Services.AddScoped<TaskInterceptor>();

builder.Services.AddScoped<ExceptionFilter>();

builder.Services.AddScoped<TaskService>();

builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<ITaskRepository, TaskRepository>();
builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddScoped<ITaskService>(s =>
{
    var generator = s.GetRequiredService<ProxyGenerator>();
    var target = s.GetRequiredService<TaskService>();            
    var interceptor = s.GetRequiredService<TaskInterceptor>();        

    return generator.CreateInterfaceProxyWithTarget<ITaskService>(target, interceptor);

});



builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddCors(options =>
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

builder.Services.AddControllers();

var app = builder.Build();

app.UseMiddleware<LoggingMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors(MyAllowSpecificOrigins);

app.MapControllers();

app.Run();



