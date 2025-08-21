using TaskApplication.entity;
using TaskApplication.service;

var dbConn = DbConnection.Instance();
dbConn.Server = " 127.0.0.1";
dbConn.Database = "task_application";
dbConn.UserName = "root";
dbConn.Password = "root";


Repository<User> dbService = new Repository<User>(dbConn, "users");
User user1 = new User("Alice Morgan1", "1alice.morgan@example.com", "Backend Development");
User user2 = new User("Alice Morgan2", "2alice.morgan@example.com", "Backend Development");
User user3 = new User("Alice Morgan3", "3alice.morgan@example.com", "Backend Development");
User user4 = new User("Alice Morgan4", "4alice.morgan@example.com", "Backend Development");
User user5 = new User("Alice Morgan5", "5alice.morgan@example.com", "Backend Development");

User user6 = new User("Alice Morgan6", "6alice.morgan@example.com", "Backend Development");
User user7 = new User("Alice Morgan7", "7alice.morgan@example.com", "Backend Development");
User user8 = new User("Alice Morgan8", "8alice.morgan@example.com", "Backend Development");
User user9 = new User("Alice Morgan9", "9alice.morgan@example.com", "Backend Development");
User user10 = new User("Alice Morgan10", "10alice.morgan@example.com", "Backend Development");

//dbService.Save(user1);
//dbService.Save(user2);
//dbService.Save(user3);
//dbService.Save(user4);
//dbService.Save(user5);

//dbService.Save(user6);
//dbService.Save(user7);
//dbService.Save(user8);
//dbService.Save(user9);
//dbService.Save(user10);

//var result = dbService.FindById(Guid.Parse("63fce19d-7dbc-11f0-b933-00505692e06f"));
//Console.WriteLine(result.ToString());


List<User> result = dbService.getPaginatedItems(2, 5);
result.ForEach(e => Console.WriteLine(e));

//TaskApplication.entity.Task task = new TaskApplication.entity.Task
//    (Guid.Parse("24ab0076-1acc-41c2-952e-ca889c8c7695"), "Fix login bug", "Users cannot log in with correct credentials.",
//    new DateOnly(2025, 12, 6), user.Id, (int) Status.InProgress);

//Repository<TaskApplication.entity.Task> taskService = new Repository<TaskApplication.entity.Task>(dbConn, "tasks");
//taskService.Save(task);

//Console.WriteLine(taskService.FindById(Guid.Parse("24ab0076-1acc-41c2-952e-ca889c8c7695")).ToString());

//taskService.Delete(Guid.Parse("24ab0076-1acc-41c2-952e-ca889c8c7695"));
//dbService.Delete(Guid.Parse("c1a4d379-90c1-4e25-bbe2-9a413f0f2c67"));

