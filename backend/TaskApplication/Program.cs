using System.Globalization;
using TaskApplication.entity;
using TaskApplication.service;

var dbConn = DbConnection.Instance();
dbConn.Server = " 127.0.0.1";
dbConn.Database = "task_application";
dbConn.UserName = "root";
dbConn.Password = "root";


Repository<User> dbService = new Repository<User>(dbConn, "users");
User user = new User("Alice Morgan", "alice.morgan@example.com", "Backend Development");
dbService.Save(user);
//var result = dbService.FindById(Guid.Parse("c1a4d379-90c1-4e25-bbe2-9a413f0f2c67"));
//Console.WriteLine(result.ToString());

//TaskApplication.entity.Task task = new TaskApplication.entity.Task
//    (Guid.Parse("24ab0076-1acc-41c2-952e-ca889c8c7695"), "Fix login bug", "Users cannot log in with correct credentials.",
//    new DateOnly(2025, 12, 6), user.Id, (int) Status.InProgress);

//Repository<TaskApplication.entity.Task> taskService = new Repository<TaskApplication.entity.Task>(dbConn, "tasks");
//taskService.Save(task);

//Console.WriteLine(taskService.FindById(Guid.Parse("24ab0076-1acc-41c2-952e-ca889c8c7695")).ToString());

//taskService.Delete(Guid.Parse("24ab0076-1acc-41c2-952e-ca889c8c7695"));
//dbService.Delete(Guid.Parse("c1a4d379-90c1-4e25-bbe2-9a413f0f2c67"));

