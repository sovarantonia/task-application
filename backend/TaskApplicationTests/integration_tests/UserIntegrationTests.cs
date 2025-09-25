using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestPlatform.TestHost;
using MySqlConnector;
using System.Net;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using TaskApplication.controller;
using TaskApplication.entity;
using TaskApplication.entity.dto;
using TaskApplication.entity.exceptions;
using TaskApplication.repository;
using TaskApplication.service;
using TaskApplicationTests.integration_tests;
using Task = System.Threading.Tasks.Task;



namespace TaskApplicationTests;

[TestClass]
public class UserIntegrationTests
{
    private static string _conectionString = "Server=127.0.0.1; database=task_application_test; UID=root; password=root; Allow User Variables=true";
    private CustomWebApplicationFactory<Program> factory = null!;
    private HttpClient client = null!;

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
        factory = new CustomWebApplicationFactory<Program>(_conectionString);
        client = factory.CreateClient();
        using var connection = new MySqlConnection(_conectionString);
        connection.Open();
        using var dropFkCommand = new MySqlCommand("SET FOREIGN_KEY_CHECKS = 0;", connection);
        dropFkCommand.ExecuteNonQuery();
        using var command = new MySqlCommand("TRUNCATE TABLE users;", connection);
        command.ExecuteNonQuery();
    }

    [TestCleanup]
    public void Cleanup()
    {
        client.Dispose();
        factory.Dispose();
    }

    [TestMethod]
    public async Task SaveUser()
    {
        var user = new User { Name = "Alice", Email = "alice@example.com", Department = "Engineering" };

        var response = await client.PostAsJsonAsync("/User/", user);

        Assert.AreEqual(HttpStatusCode.OK, response.StatusCode);

        var created = await response.Content.ReadFromJsonAsync<User>();
        Assert.IsNotNull(created);
        Assert.AreEqual("Alice", created.Name);
        Assert.AreEqual("alice@example.com", created.Email);
    }

    [TestMethod]
    public async Task SaveUser_ThrowsException()
    {
        var user = new User { Name = "Alice", Email = "alice@example.com", Department = "Engineering" };
        var invalidUser = new User { Name = "Alice", Email = "alice@example.com", Department = "Engineering" };
        
        await client.PostAsJsonAsync("/User/", user);
       
        var response = await client.PostAsJsonAsync("/User/", invalidUser);
        
        Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);
        var error = await response.Content.ReadFromJsonAsync<ErrorModel>();
        Assert.IsNotNull(error);
        Assert.AreEqual($"User with email {user.Email} already exists", error.Message);
    }

    [TestMethod]
    public async Task GetUserById()
    {
        User userToSave = new User
        {
            Name = "Bob",
            Email = "bob@example.com",
            Department = "HR"
        };
        var res = await client.PostAsJsonAsync("/User/", userToSave);

        var user = await res.Content.ReadFromJsonAsync<User>();

        var result = await client.GetAsync($"/User/{user.Id}");

        Assert.AreEqual(HttpStatusCode.OK, result.StatusCode);

        var userGetId = await result.Content.ReadFromJsonAsync<User>();

        Assert.AreEqual(userToSave.Email, userGetId.Email);
        Assert.AreEqual(userToSave.Name, userGetId.Name);
        Assert.AreEqual(userToSave.Department, userGetId.Department);
        Assert.AreEqual(user.Id, userGetId.Id);
    }

    [TestMethod]
    public async Task GetUserById_NotFound()
    {
        Guid id = Guid.NewGuid();
        
        var res = await client.GetAsync($"/User/{id}");

        Assert.AreEqual(HttpStatusCode.NotFound, res.StatusCode);

        var error = await res.Content.ReadFromJsonAsync<ErrorModel>();

        Assert.AreEqual($"User with id {id} not found", error.Message);
    }

    [TestMethod]
    public async Task DeleteUser()
    {
        User userToSave = new User
        {
            Name = "Bob",
            Email = "bob@example.com",
            Department = "HR"
        };
        var res = await client.PostAsJsonAsync("/User/", userToSave);

        var user = await res.Content.ReadFromJsonAsync<User>();

        var result = await client.DeleteAsync($"/User/{user.Id}");

        Assert.AreEqual(HttpStatusCode.OK, result.StatusCode);
    }

    [TestMethod]
    public async Task DeleteUser_NotFound()
    {
        Guid id = Guid.NewGuid();

        var res = await client.DeleteAsync($"/User/{id}");

        Assert.AreEqual(HttpStatusCode.NotFound, res.StatusCode);

        var error = await res.Content.ReadFromJsonAsync<ErrorModel>();

        Assert.AreEqual($"User with id {id} not found", error.Message);
    }

    [TestMethod]
    public async Task UpdateUser()
    {
        User userToSave = new User
        {
            Name = "Carol",
            Email = "carol@example.com",
            Department = "IT"
        };
        var res = await client.PostAsJsonAsync("/User/", userToSave);
        var saved = await res.Content.ReadFromJsonAsync<User>();

        var patch = new User { Name = "Carol Updated", Department = "R&D" };

        var updatedResult = await client.PatchAsJsonAsync($"/User/{saved.Id}", patch);

        Assert.AreEqual(HttpStatusCode.OK, updatedResult.StatusCode);

        var updated = await updatedResult.Content.ReadFromJsonAsync<User>();
        Assert.IsNotNull(updated);
        Assert.AreEqual("Carol Updated", updated!.Name);
        Assert.AreEqual("R&D", updated!.Department);
    }

    [TestMethod]
    public async Task UpdateUser_NotFound()
    {
        Guid id = Guid.NewGuid();
        var patch = new User { Name = "Carol Updated", Department = "R&D" };

        var res = await client.PatchAsJsonAsync($"/User/{id}", patch);
        Assert.AreEqual(HttpStatusCode.NotFound, res.StatusCode);

        var error = await res.Content.ReadFromJsonAsync<ErrorModel>();
        Assert.AreEqual($"User with id {id} not found", error.Message);
    }

    [TestMethod]
    public async Task UpdateUser_InvalidEmail()
    {
        User userToSave = new User
        {
            Name = "Carol",
            Email = "carol@example.com",
            Department = "IT"
        };
        var res = await client.PostAsJsonAsync("/User/", userToSave);
        var saved = await res.Content.ReadFromJsonAsync<User>();

        var patch = new User { Name = "Carol Updated", Email = "carol@example.com" };

        var response = await client.PatchAsJsonAsync($"/User/{saved.Id}", patch);

        Assert.AreEqual(HttpStatusCode.BadRequest, response.StatusCode);

        var error = await response.Content.ReadFromJsonAsync<ErrorModel>();
        Assert.AreEqual($"User with email {patch.Email} already exists", error.Message);
    }


    [TestMethod]
    public async Task GetPaginatedUsers()
    {
        for (int i = 0; i < 7; i++)
        {
            await client.PostAsJsonAsync("/User/", (new User { Name = $"U{i}", Email = $"u{i}@ex.com" }));
        }

        var body = new
        {
            currentPageNo = 1,
            itemsPerPage = 6,
            sortCriteria = new SortCriteriaDto[] { }, 
            filterGroup = new FilterGroupDto[] { }  
        };
        var res = await client.PostAsJsonAsync("/User/list", body);

        Assert.AreEqual(HttpStatusCode.OK, res.StatusCode);

        var content = await res.Content.ReadFromJsonAsync<object>();

        var json = JsonSerializer.Serialize(content);
        var dict = JsonSerializer.Deserialize<Dictionary<string, object>>(json)!;

        Assert.IsTrue(dict.ContainsKey("paginatedItems"));
        Assert.IsTrue(dict.ContainsKey("totalPages"));
        Assert.AreEqual(2, ((JsonElement)dict["totalPages"]).GetInt32()); 
    }
}
