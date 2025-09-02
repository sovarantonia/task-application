using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using System.Text.Json;
using TaskApplication.controller;
using TaskApplication.repository;
using TaskApplication.service;
using Task = TaskApplication.entity.Task;

namespace TaskApplicationTests;

[TestClass]
public class TaskIntegrationTests
{
    private static string _conectionString = "Server=127.0.0.1; database=task_application_test; UID=root; password=root; Allow User Variables=true";

    private TaskController controller = null!;
    private ITaskService service = null!;
    private ITaskRepository repository = null!;

    [ClassInitialize]
    public static void ClassInit(TestContext _)
    {
        using MySqlConnection connection = new MySqlConnection(_conectionString);
        connection.Open();
        var query = """
              CREATE TABLE IF NOT EXISTS tasks (
          id CHAR(36) NOT NULL PRIMARY KEY DEFAULT (UUID()),
          title VARCHAR(45) NULL,
          description TEXT NULL,
          statusId VARCHAR(45) NULL,
          userId CHAR(36) NOT NULL,
          creationDate DATE NULL,
          CONSTRAINT fk_tasks_status FOREIGN KEY (statusId) REFERENCES statuses(id),
          CONSTRAINT fk_tasks_user   FOREIGN KEY (userId)   REFERENCES users(id)
        );
        """;
        using var command = new MySqlCommand(query, connection);
        command.ExecuteNonQuery();
    }

    [TestInitialize]
    public void TestInit()
    {
        using var connection = new MySqlConnection(_conectionString);
        connection.Open();
        
        using var dropFkCommand = new MySqlCommand("SET FOREIGN_KEY_CHECKS = 0;", connection);
        dropFkCommand.ExecuteNonQuery();
        using var command = new MySqlCommand("TRUNCATE TABLE tasks;", connection);
        command.ExecuteNonQuery();
        using var setFk = new MySqlCommand("SET FOREIGN_KEY_CHECKS = 1;", connection);
        setFk.ExecuteNonQuery();
        using var insertAUser = new MySqlCommand("INSERT INTO USERS (id, name, email, department) " +
            "VALUES ('5aec0558-345b-477a-aebe-551ee8c47771', 'Name', 'name@example.com', 'IT')", connection);
        insertAUser.ExecuteNonQuery();

        repository = new TaskRepository(_conectionString);
        service = new TaskService(repository);
        controller = new TaskController(service);
    }

    [TestCleanup]
    public void CleanTest()
    {
        using var connection = new MySqlConnection(_conectionString);
        connection.Open();
        using var dropFkCommand = new MySqlCommand("SET FOREIGN_KEY_CHECKS = 0;", connection);
        dropFkCommand.ExecuteNonQuery();
        using var deleteUser = new MySqlCommand("DELETE FROM users WHERE id = '5aec0558-345b-477a-aebe-551ee8c47771'", connection);
        deleteUser.ExecuteNonQuery();
    }

    [TestMethod]
    public void SaveTask()
    {
        var task = new Task
        {
            Title = "First task",
            Description = "Do something",
            StatusId = 2,
            UserId = Guid.Parse("5aec0558-345b-477a-aebe-551ee8c47771"),   
            CreationDate = DateOnly.Parse("2025-09-01")
        };

        var result = controller.SaveTask(task);

        var ok = result.Result as OkObjectResult;
        Assert.IsNotNull(ok);
        var saved = ok.Value as Task;
        Assert.IsNotNull(saved);
        Assert.AreNotEqual(Guid.Empty, saved!.Id);
        Assert.AreEqual("First task", saved.Title);
        Assert.AreEqual("Do something", saved.Description);
    }

    [TestMethod]
    public void GetTaskById()
    {
        var saved = (controller.SaveTask(new Task
        {
            Title = "Check report",
            Description = "Prepare weekly report",
            StatusId = 2,
            UserId = Guid.Parse("5aec0558-345b-477a-aebe-551ee8c47771"),
            CreationDate = DateOnly.Parse("2025-09-01")
        }).Result as OkObjectResult)!.Value as Task;

        var result = controller.GetTaskById(saved!.Id);

        var ok = result.Result as OkObjectResult;
        Assert.IsNotNull(ok);
        var fetched = ok.Value as Task;
        Assert.IsNotNull(fetched);
        Assert.AreEqual(saved.Description, fetched!.Description);
    }

    [TestMethod]
    public void GetTaskById_NotFound()
    {
        var result = controller.GetTaskById(Guid.NewGuid());
        Assert.IsInstanceOfType(result.Result, typeof(NotFoundResult));
    }

    [TestMethod]
    public void DeleteTask()
    {
        var saved = (controller.SaveTask(new Task
        {
            Title = "Temp task",
            StatusId = 2,
            UserId = Guid.Parse("5aec0558-345b-477a-aebe-551ee8c47771")
        }).Result as OkObjectResult)!.Value as Task;

        var del = controller.DeleteTask(saved!.Id);
        Assert.IsInstanceOfType(del, typeof(OkResult));

        var after = controller.GetTaskById(saved.Id);
        Assert.IsInstanceOfType(after.Result, typeof(NotFoundResult));
    }

    [TestMethod]
    public void UpdateTask()
    {
        var saved = (controller.SaveTask(new Task
        {
            Title = "Old task",
            Description = "Old desc",
            StatusId = 2,
            UserId = Guid.Parse("5aec0558-345b-477a-aebe-551ee8c47771")
        }).Result as OkObjectResult)!.Value as Task;

        var patch = new Task { Title = "Updated task", Description = "New desc" };
        var result = controller.UpdateTask(saved!.Id, patch);

        var ok = result.Result as OkObjectResult;
        Assert.IsNotNull(ok);
        var updated = ok.Value as Task;
        Assert.IsNotNull(updated);
        Assert.AreEqual("Updated task", updated!.Title);
        Assert.AreEqual("New desc", updated!.Description);
    }

    [TestMethod]
    public void UpdateTask_NotFound()
    {
        var patch = new Task { Title = "Nobody" };
        var result = controller.UpdateTask(Guid.NewGuid(), patch);
        Assert.IsInstanceOfType(result.Result, typeof(NotFoundResult));
    }


    [TestMethod]
    public void GetPaginatedTasks()
    {
        for (int i = 0; i < 7; i++)
        {
            controller.SaveTask(new Task { Title = $"T{i}", StatusId = 2, UserId = Guid.Parse("5aec0558-345b-477a-aebe-551ee8c47771") });
        }

        string jsonString = @"{
            ""currentPageNo"": 1,
            ""itemsPerPage"": 6,
            ""sortCriteria"": [],
            ""filterCriteria"": []
        }";
        var details = JsonSerializer.Deserialize<Dictionary<string, object>>(jsonString);

        var action = controller.GetPaginatedTasks(details);
        var ok = action as OkObjectResult;
        Assert.IsNotNull(ok);

        var json = JsonSerializer.Serialize(ok!.Value);
        var dict = JsonSerializer.Deserialize<Dictionary<string, object>>(json)!;

        Assert.IsTrue(dict.ContainsKey("paginatedItems"));
        Assert.IsTrue(dict.ContainsKey("totalPages"));
        Assert.AreEqual(2, ((JsonElement)dict["totalPages"]).GetInt32());
    }
}
