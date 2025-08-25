using TaskApplication.entity;
using TaskApplication.repository;
using Task = TaskApplication.entity.Task;



Repository<User> userRepository = new Repository<User>("users");
User user1 = new User("Alice Morgan1", "A", "Backend Development");
User user2 = new User("Alice Morgan2", "B", "Backend Development");
User user3 = new User("Alice Morgan3", "E", "Backend Development");
User user4 = new User("Alice Morgan4", "D", "Backend Development");
User user5 = new User("Alice Morgan5", "F", "Backend Development");

User user6 = new User("Alice Morgan6", "C", "Backend Development");
User user7 = new User("Alice Morgan7", "H", "Backend Development");
User user8 = new User("Alice Morgan8", "O", "Backend Development");
User user9 = new User("Alice Morgan9", "I", "Backend Development");
User user10 = new User("Alice Morgan10", "R", "Backend Development");



var task1 = new Task(
    "Fix login bug",
    "Users cannot log in with correct credentials.",
    new DateOnly(2025, 6, 15),
    Guid.Parse("8cd36d97-7f2f-11f0-b933-00505692e06f"),
    1
);

var task2 = new Task(
    "Add user profile page",
    "Create a page where users can update their personal information.",
    new DateOnly(2025, 6, 14),
    Guid.Parse("8d1570a1-7f2f-11f0-b933-00505692e06f"),
    2
);

var task3 = new Task(
    "Optimize database queries",
    "Improve the performance of slow-loading pages by optimizing queries.",
    new DateOnly(2025, 6, 12),
    Guid.Parse("8d15e5f2-7f2f-11f0-b933-00505692e06f"),
    2
);

var task4 = new Task(
    "Implement dark mode",
    "Add an option for users to toggle dark mode in settings.",
    new DateOnly(2025, 6, 13),
    Guid.Parse("8d16327d-7f2f-11f0-b933-00505692e06f"),
    2
);

var task5 = new Task(
    "Write integration tests for user service",
    "Ensure critical user workflows are covered by integration tests.",
    new DateOnly(2025, 6, 15),
    Guid.Parse("8d168f45-7f2f-11f0-b933-00505692e06f"),
    4
);

var task6 = new Task(
    "Fix password reset issue",
    "Reset link fails for accounts created before 2024.",
    new DateOnly(2025, 6, 16),
    Guid.Parse("8d16d92b-7f2f-11f0-b933-00505692e06f"),
    1
);

var task7 = new Task(
    "Redesign user profile UI",
    "Modernize the layout of the user profile page.",
    new DateOnly(2025, 6, 17),
    Guid.Parse("8d1746ce-7f2f-11f0-b933-00505692e06f"),
    1
);

var task8 = new Task(
    "Add indexing to improve search speed",
    "Use PostgreSQL indexing to enhance filtering by title.",
    new DateOnly(2025, 6, 17),
    Guid.Parse("8d17838d-7f2f-11f0-b933-00505692e06f"),
    2
);

var task9 = new Task(
    "Add system-wide color theme toggle",
    "Support dynamic switching between themes.",
    new DateOnly(2025, 6, 18),
    Guid.Parse("8d17cdd5-7f2f-11f0-b933-00505692e06f"),
    2
);

var task10 = new Task(
    "Add user profile page",
    "Organize unit and integration tests into separate folders.",
    new DateOnly(2025, 6, 18),
    Guid.Parse("8d181e8f-7f2f-11f0-b933-00505692e06f"),
    2
);


Repository<Task> taskRepository = new Repository<TaskApplication.entity.Task>("tasks");



Dictionary<string, int> sortCriteria = new Dictionary<string, int>();
sortCriteria.Add("title", 1);
sortCriteria.Add("creationDate", -1);
Dictionary<string, string> filterCriteria = new Dictionary<string, string>();
filterCriteria.Add("statusId", "2");


List<Task> result = taskRepository.GetPaginatedItems(1, 5, sortCriteria, filterCriteria);
List<Task> result1 = taskRepository.GetPaginatedItems(2, 5, sortCriteria, filterCriteria);
List<Task> result2 = taskRepository.GetPaginatedItems(1, 5, new Dictionary<string, int>(), filterCriteria);
List<Task> result3 = taskRepository.GetPaginatedItems(2, 5, new Dictionary<string, int>(), filterCriteria);
//Console.WriteLine("Pagination first page and 5 items");
//result2.ForEach(e => Console.WriteLine(e));
//Console.WriteLine("\n");

//Console.WriteLine("Pagination last page and 5 items");
//result3.ForEach(e => Console.WriteLine(e));
//Console.WriteLine("\n");

//Console.WriteLine("Pagination with sort first page and 5 items");
//result.ForEach(e => Console.WriteLine(e));
//Console.WriteLine("\n");

//Console.WriteLine("Pagination with sort second page and 5 items");
//result1.ForEach(e => Console.WriteLine(e));
//Console.WriteLine("\n");

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers();

app.Run();



