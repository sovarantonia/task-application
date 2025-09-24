using Moq;
using System.Text.Json;
using TaskApplication.entity.dto;
using TaskApplication.repository;

using Task = TaskApplication.entity.Task;

namespace TaskApplication.service.Tests
{
    [TestClass()]
    [Ignore]
    public class TaskServiceTests
    {
        private Mock<ITaskRepository> repository = new Mock<ITaskRepository>();
        private ITaskService service;

        public TaskServiceTests()
        {
            service = new TaskService(repository.Object);
        }

        [TestMethod()]
        public void SaveTest()
        {
            Guid userId = Guid.NewGuid();
            int statusId = 2;
            Guid id = Guid.NewGuid();
            Task savedTask = new Task { Id = id, UserId = userId, Title = "Title", CreationDate = DateOnly.Parse("2025-09-01"), StatusId = statusId };
            Task taskToSave = new Task { UserId = userId, Title = "Title", CreationDate = DateOnly.Parse("2025-09-01"), StatusId = statusId };
            repository.Setup(repo => repo.Save(It.IsAny<Task>()))
                .Returns(savedTask);

            Task result = service.Save(taskToSave);
            Assert.IsNotNull(result);
            Assert.AreEqual(savedTask.Id, result.Id);
            Assert.AreEqual(savedTask.Title, result.Title);
            Assert.AreEqual(savedTask.CreationDate, result.CreationDate);
            Assert.AreEqual(savedTask.UserId, result.UserId);
            Assert.AreEqual(savedTask.StatusId, result.StatusId);
        }

        [TestMethod()]
        public void FindTaskByIdTest()
        {
            Guid id = Guid.NewGuid();
            Task foundTask = new Task { Id = id, Title = "Title" };
            repository.SetupSequence(repo => repo.FindById(It.IsAny<Guid>()))
                .Returns(foundTask)
                .Returns((Task?)null);

            Task foundResult = service.FindTaskById(id);
            Task notFoundTask = service.FindTaskById(Guid.NewGuid());

            Assert.IsNotNull(foundResult);
            Assert.AreEqual(foundTask.Id, foundResult.Id);
            Assert.AreEqual(foundTask.Title, foundResult.Title);
            Assert.IsNull(notFoundTask);
        }

        [TestMethod()]
        public void DeleteTaskTest()
        {
            Guid id = Guid.NewGuid();
            repository.Setup(repo => repo.Delete(It.IsAny<Guid>()))
                .Verifiable();

            service.DeleteTask(id);

            repository.Verify(repo => repo.Delete(It.IsAny<Guid>()), Times.Once());
        }

        [TestMethod()]
        public void UpdateTaskTest()
        {
            Guid id = Guid.NewGuid();
            Task initialTask = new Task { Id = id, Title = "Title", CreationDate = DateOnly.Parse("2025-09-01"), StatusId = 2 };
            Task newTask = new Task { Title = "new Title", StatusId = 3 };
            Task updatedTask = new Task { Id = id, Title = "new Title", CreationDate = DateOnly.Parse("2025-09-01"), StatusId = 3 };
            repository.Setup(repo => repo.Update(It.IsAny<Guid>(), It.IsAny<Task>()))
                .Returns(updatedTask);
            repository.Setup(repo => repo.FindById(It.IsAny<Guid>()))
                .Returns(initialTask);

            Task result = service.UpdateTask(id, newTask);

            Assert.IsNotNull(result);
            Assert.AreEqual(updatedTask.Title, result.Title);
            Assert.AreEqual(updatedTask.StatusId, result.StatusId);
        }

        [TestMethod()]
        public void GetPaginatedTasksTest()
        {
            var tasks = new List<Task>
                {
                    new Task
                    {
                        Id = Guid.NewGuid(),
                        Title = "Fix login bug",
                        CreationDate = DateOnly.Parse("2025-09-01"),
                        StatusId = 1
                    },
                    new Task
                    {
                        Id = Guid.NewGuid(),
                        Title = "Add user profile page",
                        CreationDate = DateOnly.Parse("2025-09-02"),
                        StatusId = 2
                    },
                    new Task
                    {
                        Id = Guid.NewGuid(),
                        Title = "Optimize queries",
                        CreationDate = DateOnly.Parse("2025-09-03"),
                        StatusId = 3
                    },
                    new Task
                    {
                        Id = Guid.NewGuid(),
                        Title = "Deploy to staging",
                        CreationDate = DateOnly.Parse("2025-09-04"),
                        StatusId = 4
                    },
                    new Task
                    {
                        Id = Guid.NewGuid(),
                        Title = "Fix login bug",
                        CreationDate = DateOnly.Parse("2025-09-01"),
                        StatusId = 1
                    },
                    new Task
                    {
                        Id = Guid.NewGuid(),
                        Title = "Add user profile page",
                        CreationDate = DateOnly.Parse("2025-09-02"),
                        StatusId = 2
                    },
                    new Task
                    {
                        Id = Guid.NewGuid(),
                        Title = "Optimize queries",
                        CreationDate = DateOnly.Parse("2025-09-03"),
                        StatusId = 3
                    },
                    new Task
                    {
                        Id = Guid.NewGuid(),
                        Title = "Deploy to staging",
                        CreationDate = DateOnly.Parse("2025-09-04"),
                        StatusId = 4
                    }
                };

            string json = @"{
                ""currentPageNo"": 1,
                ""itemsPerPage"": 4,
                ""sortCriteria"": [],
                ""filterGroup"": []
                            }";
            var details = JsonSerializer.Deserialize<Dictionary<string, object>>(json);


            repository.Setup(repo => repo.GetPaginatedItems(It.IsAny<int>(), It.IsAny<int>()
                , It.IsAny<Dictionary<string, int>>(), It.IsAny<List<FilterGroupDto>>()))
                .Returns(tasks.Slice(0, 4));

            List<Task> result = service.GetPaginatedTasks(details);
            Assert.AreEqual(4, result.Count);
            for(int i = 0; i < result.Count; i++)
            {
                Assert.AreEqual(tasks.ElementAt(i).Title, result.ElementAt(i).Title);
                Assert.AreEqual(tasks.ElementAt(i).CreationDate, result.ElementAt(i).CreationDate);
                Assert.AreEqual(tasks.ElementAt(i).StatusId, result.ElementAt(i).StatusId);
                Assert.AreEqual(tasks.ElementAt(i).Id, result.ElementAt(i).Id);
            }
        }
    }
}