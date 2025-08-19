using TaskApplication.service;
using TaskApplication.entity;

var dbConn = DbConnection.Instance();
dbConn.Server = " 127.0.0.1";
dbConn.Database = "task_application";
dbConn.UserName = "root";
dbConn.Password = "root";


DbService<User> dbService = new DbService<User>(dbConn, "users");
User user = new User("c1a4d379-90c1-4e25-bbe2-9a413f0f2c67", "Alice Morgan", "alice.morgan@example.com", "Backend Development");
dbService.Save(user);
var result = dbService.FindById("c1a4d379-90c1-4e25-bbe2-9a413f0f2c67");
Console.WriteLine(result.ToString());

//DbService<Status> statusService = new DbService<Status>(dbConn, "statuses");
//statusService.Save(Status.ToDo);
//statusService.Save(Status.InProgress);
//statusService.Save(Status.InReview);
//statusService.Save(Status.Done);

TaskApplication.entity.Task task = new TaskApplication.entity.Task
    ("24ab0076-1acc-41c2-952e-ca889c8c7695", "Fix login bug", "Users cannot log in with correct credentials.", DateTime.Parse("2025-06-15"), user, Status.InProgress);

DbService<TaskApplication.entity.Task> taskService = new DbService<TaskApplication.entity.Task>(dbConn, "tasks");
taskService.Save(task);

Console.WriteLine(taskService.FindById("24ab0076-1acc-41c2-952e-ca889c8c7695").ToString());

taskService.Delete("24ab0076-1acc-41c2-952e-ca889c8c7695");
dbService.Delete("c1a4d379-90c1-4e25-bbe2-9a413f0f2c67");

