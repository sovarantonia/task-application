using TaskApplication.repository;
using TaskApplication.service;

var  MyAllowSpecificOrigins = "MyAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<IUserRepository, UserRepository>();
builder.Services.AddSingleton<ITaskRepository, TaskRepository>();
builder.Services.AddSingleton<IUserService, UserService>();
builder.Services.AddSingleton<ITaskService, TaskService>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy
                          .WithOrigins("http://127.0.0.1:8080")
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                      });
});

builder.Services.AddControllers();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors(MyAllowSpecificOrigins);

app.MapControllers();

app.Run();



