using Moq;
using System.Text.Json;
using TaskApplication.entity;
using TaskApplication.entity.dto;
using TaskApplication.entity.exceptions;
using TaskApplication.repository;

namespace TaskApplication.service.Tests
{
    [TestClass()]
    public class UserServiceTests
    {
        readonly Mock<IUserRepository> repository = new Mock<IUserRepository>();
        private IUserService service;

        public UserServiceTests()
        {
            service = new UserService(repository.Object);
        }

        [TestMethod]
        public void ValidateUserTest_ValidUser()
        {
            User userToSave = new User { Id = Guid.Parse("1543f9e2-8351-11f0-829d-00505692e06f"), Name = "Name", Email = "email@example.com" };
            repository.Setup(repo => repo.FindUserByEmail(It.IsAny<string>()))
                .Returns((User?)null);
                
            service.ValidateUser(userToSave);
            
            repository.Verify(repo => repo.FindUserByEmail(It.IsAny<string>()), Times.Once());
        }

        [TestMethod]
        public void ValidateUserTest_ThrowsException()
        {
            repository.Setup(repo => repo.FindUserByEmail(It.IsAny<string>()))
                .Returns(new User() { Email = "email@example.com"});

            User invalidUser = new User { Id = Guid.NewGuid(), Email = "email@example.com" };
            
            var exception = Assert.ThrowsException<UserAlreadyExistsException>(() => service.ValidateUser(invalidUser));
            Assert.AreEqual($"User with email {invalidUser.Email} already exists", exception.Message);
        }

        [TestMethod()]
        public void SaveUserTest_ValidUser()
        {
            User userToSave = new User { Id = Guid.Parse("1543f9e2-8351-11f0-829d-00505692e06f"), Name = "Name", Email = "email@example.com" };
            repository.Setup(repo => repo.FindUserByEmail(It.IsAny<string>()))
                .Returns((User?)null);
            repository.Setup(repo => repo.Save(It.IsAny<User>()))
                .Returns(userToSave);

            var savedUser = service.SaveUser(new User());

            Assert.AreEqual(Guid.Parse("1543f9e2-8351-11f0-829d-00505692e06f"), savedUser.Id);
            Assert.AreEqual("Name", savedUser.Name);
            Assert.AreEqual("email@example.com", savedUser.Email);
        }

        [TestMethod]
        public void SaveUserTest_ThrowsException()
        {
            repository.Setup(repo => repo.FindUserByEmail(It.IsAny<string>()))
                .Returns(new User() { Email = "email@example.com" });

            User invalidUser = new User { Id = Guid.NewGuid(), Email = "email@example.com" };
            
            var exception = Assert.ThrowsException<UserAlreadyExistsException>(() => service.SaveUser(invalidUser));
            Assert.AreEqual($"User with email {invalidUser.Email} already exists", exception.Message);
        }

        [TestMethod()]
        public void FindUserByIdTest_ValidUser()
        {
            User userToFind = new User { Id = Guid.Parse("1543f9e2-8351-11f0-829d-00505692e06f"), Name = "Name", Email = "email@example.com" };
            repository.Setup(repo => repo.FindById(It.IsAny<Guid>()))
                .Returns(userToFind);

            var foundUser = service.FindUserById(Guid.Parse("1543f9e2-8351-11f0-829d-00505692e06f"));
            
            Assert.AreEqual(Guid.Parse("1543f9e2-8351-11f0-829d-00505692e06f"), foundUser.Id);
            Assert.AreEqual("Name", foundUser.Name);
            Assert.AreEqual("email@example.com", foundUser.Email);    
        }

        [TestMethod]
        public void FindUserByIdTest_ThrowsException()
        {
            Guid guid = Guid.Parse("1543f9e2-8351-11f0-829d-00505692e06f");
            repository.Setup(repo => repo.FindById(It.IsAny<Guid>()))
                .Returns((User?)null);

            var exception = Assert.ThrowsException<EntityNotFoundException>(() => service.FindUserById(guid));
            Assert.AreEqual($"User with id {guid} not found", exception.Message);
        }

        [TestMethod()]
        public void DeleteUserTest_ValidUser()
        {
            Guid id = Guid.Parse("1543f9e2-8351-11f0-829d-00505692e06f");
            repository.Setup(repo => repo.FindById(It.IsAny<Guid>()))
                .Returns(new User() { Id = id });
            repository.Setup(repo => repo.Delete(It.IsAny<Guid>()))
                .Verifiable();

            service.DeleteUser(id);

            repository.Verify(repo => repo.Delete((It.IsAny<Guid>())), Times.Once());
        }

        [TestMethod]
        public void DeleteUserTest_ThrowsException()
        {
            Guid id = Guid.Parse("1543f9e2-8351-11f0-829d-00505692e06f");
            repository.Setup(repo => repo.FindById(It.IsAny<Guid>()))
                .Returns((User?)null);

            var exception = Assert.ThrowsException<EntityNotFoundException>(() => service.DeleteUser(id));
            Assert.AreEqual($"User with id {id} not found", exception.Message);
        }

        [TestMethod()]
        public void UpdateUserTest_ValidUser()
        {
            User updatedUserDetails = new User { Id = Guid.Parse("1543f9e2-8351-11f0-829d-00505692e06f"), Name = "New name", Email = "new.email@example.com" };
            var initialUser = new User { Id = Guid.Parse("1543f9e2-8351-11f0-829d-00505692e06f") };
            repository.Setup(repo => repo.Update(It.IsAny<Guid>(), It.IsAny<User>()))
                .Returns(updatedUserDetails);
            repository.Setup(repo => repo.FindById(It.IsAny<Guid>()))
                .Returns(initialUser);

            var res = service.UpdateUser(initialUser.Id, updatedUserDetails);

            Assert.AreEqual(updatedUserDetails.Name, res.Name);
            Assert.AreEqual(updatedUserDetails.Email, res.Email);
            Assert.AreEqual(Guid.Parse("1543f9e2-8351-11f0-829d-00505692e06f"), res.Id);
        }

        [TestMethod]
        public void UpdateUserTest_ThrowsException()
        {
            User updatedUserDetails = new User { Id = Guid.Parse("1543f9e2-8351-11f0-829d-00505692e06f"), Name = "New name", Email = "new.email@example.com" };
            var initialUser = new User { Id = Guid.Parse("1543f9e2-8351-11f0-829d-00505692e06f") };
            repository.Setup(repo => repo.FindById(It.IsAny<Guid>()))
                .Returns(initialUser);
            repository.Setup(repo => repo.FindUserByEmail(It.IsAny<string>()))
                .Returns(new User() { Email = "new.email@example.com" });

            var exception = Assert.ThrowsException<UserAlreadyExistsException>(() => service.UpdateUser(initialUser.Id, updatedUserDetails));
            Assert.AreEqual($"User with email {updatedUserDetails.Email} already exists", exception.Message);
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

            repository.Setup(repo => repo.GetPaginatedItems(It.IsAny<int>(), It.IsAny<int>()
                , It.IsAny<Dictionary<string, int>>(), It.IsAny<List<FilterGroupDto>>()))
                .Returns(userList);

            string json = @"{
                ""currentPageNo"": 1,
                ""itemsPerPage"": 6,
                ""sortCriteria"": [],
                ""filterGroup"": []
                            }";
            var details = JsonSerializer.Deserialize<Dictionary<string, object>>(json);

            List<User> result = service.GetPaginatedUsers(details);

            Assert.AreEqual(userList.Count, result.Count);
            for (int i = 0; i < userList.Count; i++)
            {
                Assert.AreEqual(userList.ElementAt(i), result.ElementAt(i));
            }
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

            repository.Setup(repo => repo.GetAllItems())
                .Returns(userList);

            List<User> result = service.GetAllUsers();

            Assert.AreEqual(userList.Count, result.Count);
            for (int i = 0; i < userList.Count; i++)
            {
                Assert.AreEqual(userList.ElementAt(i), result.ElementAt(i));
            }
        }
    }
}