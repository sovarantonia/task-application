using TaskApplication.config;
using TaskApplication.filter_midw;


var MyAllowSpecificOrigins = "MyAllowSpecificOrigins";

var builder = WebApplication.CreateBuilder(args);

builder.Services
    .AddHttpConfig(MyAllowSpecificOrigins)
    .AddAuthorizedEmails(builder.Configuration)
    .AddCurrentUser()
    .AddFilter()
    .AddService()
    .AddTaskService();

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

public partial class Program { }

