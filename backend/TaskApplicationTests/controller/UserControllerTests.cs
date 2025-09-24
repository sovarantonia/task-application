using TaskApplication.service;
using Moq;
using TaskApplication.entity;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace TaskApplication.controller.Tests
{
    [TestClass()]
    public class UserControllerTests
    {
        private readonly Mock<IUserService> service = new Mock<IUserService>();
        private UserController controller;

        public UserControllerTests()
        {
            controller = new UserController(service.Object);
        }

        [TestMethod()]
        public void GetUserByIdTest()
        {
            Guid id = Guid.Parse("1543f9e2-8351-11f0-829d-00505692e06f");
            User userToFind = new User { Id = id, Name = "Name", Email = "email@example.com" };
            service.Setup(s => s.FindUserById(It.IsAny<Guid>()))
                .Returns(userToFind);

            ActionResult<User> result = controller.GetUserById(id);
           
            var user = result.Value;
            Assert.IsNotNull(user);
            Assert.AreEqual(userToFind.Name, user.Name);
            Assert.AreEqual(userToFind.Email, user.Email);
        }

        [TestMethod()]
        public void SaveUserTest()
        {
            Guid id = Guid.Parse("1543f9e2-8351-11f0-829d-00505692e06f");
            User userToSave = new User { Id = id, Name = "Name", Email = "email@example.com" };
            service.SetupSequence(s => s.SaveUser(It.IsAny<User>()))
                .Returns(userToSave);

            ActionResult<User> okResult = controller.SaveUser(userToSave);
            
            var user = okResult.Value;
            Assert.IsNotNull(user);
            Assert.AreEqual(userToSave.Name, user.Name);
            Assert.AreEqual(userToSave.Email, user.Email);  
        }

        [TestMethod()]
        public void DeleteUserTest()
        {
            Guid id = Guid.Parse("1543f9e2-8351-11f0-829d-00505692e06f");
            service.Setup(s => s.DeleteUser(It.IsAny<Guid>()))
                .Verifiable();

            IActionResult result = controller.DeleteUser(id);

            service.Verify(s => s.DeleteUser(It.IsAny<Guid>()), Times.Once());
            var ok = result as OkResult;
            Assert.IsNotNull(ok);
            Assert.AreEqual(200, ok.StatusCode);
        }

        [TestMethod()]
        public void UpdateUserTest()
        {
            Guid id = Guid.Parse("1543f9e2-8351-11f0-829d-00505692e06f");
            User initialUser = new User { Id = id };
            User userToUpdate = new User { Name = "Name Name", Email = "email@example.com" };
            User updatedUser = new User { Id = id, Name = "Name Name", Email = "email@example.com" };
            service.SetupSequence(s => s.FindUserById(It.IsAny<Guid>()))
                .Returns(initialUser);
            service.SetupSequence(s => s.UpdateUser(It.IsAny<Guid>(), It.IsAny<User>()))
                .Returns(updatedUser);

            ActionResult<User> okResult = controller.UpdateUser(id, userToUpdate);

            var user = okResult.Value;
            Assert.AreEqual(updatedUser.Name, user.Name);
            Assert.AreEqual(updatedUser.Email, user.Email);
            Assert.AreEqual(updatedUser.Id, id);
        }

        [TestMethod()]
        public void GetPaginatedUsersTest()
        {
            List<User> userList = new List<User>()
            {
                new User { Id = Guid.NewGuid(), Name = "Alice", Email = "alice@example.com" },
                new User { Id = Guid.NewGuid(), Name = "Bob", Email = "bob@example.com" },
                new User { Id = Guid.NewGuid(), Name = "Charlie", Email = "charlie@example.com" } ,
                new User { Id = Guid.NewGuid(), Name = "Alice", Email = "alice1@example.com" },
                new User { Id = Guid.NewGuid(), Name = "Bob", Email = "bob1@example.com" },
                new User { Id = Guid.NewGuid(), Name = "Charlie", Email = "charlie1@example.com" },
            };
            string json = @"{
                ""currentPageNo"": 1,
                ""itemsPerPage"": 6,
                ""sortCriteria"": [],
                ""filterGroup"": []
                            }";
            var details = JsonSerializer.Deserialize<Dictionary<string, object>>(json);
            service.Setup(s => s.GetPaginatedUsers(It.IsAny<Dictionary<string, object>>()))
                .Returns(userList);

            IActionResult result = controller.GetPaginatedUsers(details);
            var ok = result as OkObjectResult;
            Assert.IsNotNull(ok);
            Assert.AreEqual(200, ok.StatusCode);
            var value = ok.Value;
            var dict = JsonSerializer.Deserialize<Dictionary<string, object>>(JsonSerializer.Serialize(value));
            Assert.IsTrue(dict.ContainsKey("paginatedItems"));
            Assert.IsTrue(dict.ContainsKey("totalPages"));
        }

        [TestMethod()]
        public void GetAllUsersTest()
        {
            List<User> userList = new List<User>()
            {
                new User { Id = Guid.NewGuid(), Name = "Alice", Email = "alice@example.com" },
                new User { Id = Guid.NewGuid(), Name = "Bob", Email = "bob@example.com" },
                new User { Id = Guid.NewGuid(), Name = "Charlie", Email = "charlie@example.com" } ,
                new User { Id = Guid.NewGuid(), Name = "Alice", Email = "alice1@example.com" },
                new User { Id = Guid.NewGuid(), Name = "Bob", Email = "bob1@example.com" },
                new User { Id = Guid.NewGuid(), Name = "Charlie", Email = "charlie1@example.com" },
            };
            service.Setup(s => s.GetAllUsers())
                .Returns(userList);

            ActionResult<List<User>> result = controller.GetAllUsers();

            var ok = result.Result as OkObjectResult;
            Assert.IsNotNull(ok);
            Assert.AreEqual(200, ok.StatusCode);

            var resultList = ok.Value as List<User>;
            Assert.IsNotNull(resultList);
            Assert.AreEqual(userList.Count, resultList!.Count);
            for (int i = 0; i < userList.Count; i++)
            {
                Assert.AreEqual(userList[i].Name, resultList[i].Name);
                Assert.AreEqual(userList[i].Email, resultList[i].Email);
            }
        }
    }
}