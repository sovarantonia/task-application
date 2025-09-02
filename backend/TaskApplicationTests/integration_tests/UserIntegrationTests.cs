using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using MySqlConnector;
using MySqlX.XDevAPI.Common;
using System.Text.Json;
using System.Xml;
using System.Xml.Linq;
using TaskApplication.controller;
using TaskApplication.entity;
using TaskApplication.repository;
using TaskApplication.service;


namespace TaskApplicationTests;

[TestClass]
public class UserIntegrationTests
{
    private static string _conectionString = "Server=127.0.0.1; database=task_application_test; UID=root; password=root; Allow User Variables=true";

    private UserController controller = null!;
    private IUserService service = null!;
    private IUserRepository repository = null!;

    [ClassInitialize]
    public static void ClassInit(TestContext _)
    {
        using MySqlConnection connection = new MySqlConnection(_conectionString);
        connection.Open();
        var query = """
               CREATE TABLE  IF NOT EXISTS users(
          id CHAR(36) NOT NULL PRIMARY KEY DEFAULT(UUID()),
          name VARCHAR(45) NULL,
          email VARCHAR(45) NOT NULL UNIQUE,
          department VARCHAR(45) NULL
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
        using var command = new MySqlCommand("TRUNCATE TABLE users;", connection);
        command.ExecuteNonQuery();

        repository = new UserRepository(_conectionString);
        service = new UserService(repository);
        controller = new UserController(service);
    }

    [TestMethod]
    public void SaveUser()
    {
        var user = new User { Name = "Alice", Email = "alice@example.com", Department = "Engineering" };

        var result = controller.SaveUser(user);

        var ok = result.Result as OkObjectResult;
        Assert.IsNotNull(ok);
        var saved = ok.Value as User;
        Assert.IsNotNull(saved);
        Assert.AreNotEqual(Guid.Empty, saved.Id);
        Assert.AreEqual("Alice", saved.Name);
        Assert.AreEqual("alice@example.com", saved.Email);
    }

    [TestMethod]
    public void GetUserById()
    {
        var saved = (controller.SaveUser(new User
        {
            Name = "Bob",
            Email = "bob@example.com",
            Department = "HR"
        }).Result as OkObjectResult)!.Value as User;

        var result = controller.GetUserById(saved.Id);

        var ok = result.Result as OkObjectResult;
        Assert.IsNotNull(ok);
        var fetched = ok.Value as User;
        Assert.IsNotNull(fetched);
        Assert.AreEqual(saved.Email, fetched.Email);
    }

    [TestMethod]
    public void GetUserById_NotFound()
    {
        var result = controller.GetUserById(Guid.NewGuid());
        Assert.IsInstanceOfType(result.Result, typeof(NotFoundResult));
    }

    [TestMethod]
    public void DeleteUser()
    {
        var saved = (controller.SaveUser(new User
        {
            Name = "Temp",
            Email = "temp@example.com"
        }).Result as OkObjectResult)!.Value as User;

        var del = controller.DeleteUser(saved!.Id);
        Assert.IsInstanceOfType(del, typeof(OkResult));

        var after = controller.GetUserById(saved.Id);
        Assert.IsInstanceOfType(after.Result, typeof(NotFoundResult));
    }

    [TestMethod]
    public void UpdateUser()
    {
        var saved = (controller.SaveUser(new User
        {
            Name = "Carol",
            Email = "carol@example.com",
            Department = "IT"
        }).Result as OkObjectResult)!.Value as User;

        var patch = new User { Name = "Carol Updated", Department = "R&D" };
        var result = controller.UpdateUser(saved!.Id, patch);

        var ok = result.Result as OkObjectResult;
        Assert.IsNotNull(ok);
        var updated = ok.Value as User;
        Assert.IsNotNull(updated);
        Assert.AreEqual("Carol Updated", updated!.Name);
        Assert.AreEqual("R&D", updated!.Department);
    }

    [TestMethod]
    public void UpdateUser_BadReq()
    {
        var patch = new User { Name = "Nobody", Department = "None" };
        var result = controller.UpdateUser(Guid.NewGuid(), patch);
        Assert.IsInstanceOfType(result.Result, typeof(BadRequestResult));
    }

    [TestMethod]
    public void GetAllUsers()
    {
        controller.SaveUser(new User { Name = "Alice", Email = "alice1@example.com" });
        controller.SaveUser(new User { Name = "Bob", Email = "bob@example.com" });

        ActionResult<List<User>> result = controller.GetAllUsers();

        var ok = result.Result as OkObjectResult;     
        Assert.IsNotNull(ok);
        Assert.AreEqual(200, ok.StatusCode);

        var list = ok.Value as List<User>;
        Assert.IsNotNull(list);
        Assert.AreEqual(2, list!.Count);
        Assert.IsTrue(list.Any(u => u.Email == "alice1@example.com"));
        Assert.IsTrue(list.Any(u => u.Email == "bob@example.com"));
    }

    [TestMethod]
    public void GetPaginatedUsers()
    {
        for (int i = 0; i < 7; i++)
        {
            controller.SaveUser(new User { Name = $"U{i}", Email = $"u{i}@ex.com" });
        }

        string jsonString = @"{
                ""currentPageNo"": 1,
                ""itemsPerPage"": 6,
                ""sortCriteria"": [],
                ""filterCriteria"": []
                            }";
        var details = JsonSerializer.Deserialize<Dictionary<string, object>>(jsonString);

        var action = controller.GetPaginatedUsers(details);
        var ok = action as OkObjectResult;
        Assert.IsNotNull(ok);

        var json = JsonSerializer.Serialize(ok!.Value);
        var dict = JsonSerializer.Deserialize<Dictionary<string, object>>(json)!;

        Assert.IsTrue(dict.ContainsKey("paginatedItems"));
        Assert.IsTrue(dict.ContainsKey("totalPages"));
        Assert.AreEqual(2, ((JsonElement)dict["totalPages"]).GetInt32()); 
    }
}
