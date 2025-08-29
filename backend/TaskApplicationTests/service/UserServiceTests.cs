using Moq;
using System.Text.Json;
using TaskApplication.entity;
using TaskApplication.repository;

namespace TaskApplication.service.Tests
{
    [TestClass()]
    public class UserServiceTests
    {
        readonly Mock<IUserRepository> userRepository = new Mock<IUserRepository>();

        [TestMethod()]
        public void ValidateUserTest()
        {
            User userToSave = new User { Id = Guid.Parse("1543f9e2-8351-11f0-829d-00505692e06f"), Name = "Name", Email = "email@example.com" };
            userRepository.SetupSequence(repo => repo.FindUserByEmail(It.IsAny<string>()))
                .Returns((User?)null)
                .Returns(userToSave);

            IUserService service = new UserService(userRepository.Object);
            var firstCall = service.ValidateUser(userToSave);
            var secondCall = service.ValidateUser(userToSave);

            Assert.IsTrue(firstCall);
            Assert.IsFalse(secondCall);
        }
        
        [TestMethod()]
        public void SaveUserTest()
        {
            User userToSave = new User { Id = Guid.Parse("1543f9e2-8351-11f0-829d-00505692e06f"), Name = "Name", Email = "email@example.com" };
            userRepository.Setup(repo => repo.Save(It.IsAny<User>()))
                .Returns(userToSave);

            IUserService service = new UserService(userRepository.Object);

            var savedUser = service.SaveUser(new User());
            Assert.AreEqual(Guid.Parse("1543f9e2-8351-11f0-829d-00505692e06f"), savedUser.Id);
            Assert.AreEqual("Name", savedUser.Name);
            Assert.AreEqual("email@example.com", savedUser.Email);
        }

        [TestMethod()]
        public void FindUserByIdTest()
        {
            User userToFind = new User { Id = Guid.Parse("1543f9e2-8351-11f0-829d-00505692e06f"), Name = "Name", Email = "email@example.com" };
            userRepository.Setup(repo => repo.FindById(It.IsAny<Guid>()))
                .Returns(userToFind);

            IUserService service = new UserService(userRepository.Object);

            var foundUser = service.FindUserById(Guid.Parse("1543f9e2-8351-11f0-829d-00505692e06f"));
            Assert.AreEqual(Guid.Parse("1543f9e2-8351-11f0-829d-00505692e06f"), foundUser.Id);
            Assert.AreEqual("Name", foundUser.Name);
            Assert.AreEqual("email@example.com", foundUser.Email);
        }

        [TestMethod()]
        public void DeleteUserTest()
        {
            Guid id = Guid.Parse("1543f9e2-8351-11f0-829d-00505692e06f");
            userRepository.Setup(repo => repo.Delete(It.IsAny<Guid>()))
                .Verifiable();

            IUserService service = new UserService(userRepository.Object);
            service.DeleteUser(id);
            userRepository.Verify(repo => repo.Delete((It.IsAny<Guid>())), Times.Once());
        }

        [TestMethod()]
        public void UpdateUserTest()
        {
            User updatedUserDetails = new User { Id = Guid.Parse("1543f9e2-8351-11f0-829d-00505692e06f"), Name = "New name", Email = "new.email@example.com" };
            userRepository.Setup(repo => repo.Update(It.IsAny<Guid>(), It.IsAny<User>()))
                .Returns(updatedUserDetails);

            IUserService service = new UserService(userRepository.Object);

            var initialUser = new User { Id = Guid.Parse("1543f9e2-8351-11f0-829d-00505692e06f") };

            var res = service.UpdateUser(initialUser.Id, updatedUserDetails);

            Assert.AreEqual(updatedUserDetails.Name, res.Name);
            Assert.AreEqual(updatedUserDetails.Email, res.Email);
            Assert.AreEqual(Guid.Parse("1543f9e2-8351-11f0-829d-00505692e06f"), res.Id);
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

            userRepository.Setup(repo => repo.GetPaginatedItems(It.IsAny<int>(), It.IsAny<int>()
                , It.IsAny<Dictionary<string, int>>(), It.IsAny<Dictionary<string, string>>()))
                .Returns(userList);

            IUserService service = new UserService(userRepository.Object);

            string json = @"{
                ""currentPageNo"": 1,
                ""itemsPerPage"": 6,
                ""sortCriteria"": [],
                ""filterCriteria"": []
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

            userRepository.Setup(repo => repo.GetAllItems())
                .Returns(userList);

            IUserService service = new UserService(userRepository.Object);

            List<User> result = service.GetAllUsers();

            Assert.AreEqual(userList.Count, result.Count);
            for (int i = 0; i < userList.Count; i++)
            {
                Assert.AreEqual(userList.ElementAt(i), result.ElementAt(i));
            }
        }
    }
}