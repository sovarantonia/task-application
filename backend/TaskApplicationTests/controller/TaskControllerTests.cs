using Microsoft.AspNetCore.Mvc;
using Moq;
using System.Text.Json;
using TaskApplication.service;
using Task = TaskApplication.entity.Task;

namespace TaskApplication.controller.Tests
{
    [TestClass()]
    public class TaskControllerTests
    {
        private Mock<ITaskService> service = new Mock<ITaskService>();
        private TaskController controller;
        public TaskControllerTests()
        {
            controller = new TaskController(service.Object);
        }

        [TestMethod()]
        public void GetTaskByIdTest()
        {
            Guid id = Guid.NewGuid();
            Task taskToFind = new Task { Id = id, Title = "Title" };
            service.Setup(s => s.FindTaskById(It.IsAny<Guid>()))
                .Returns(taskToFind);

            ActionResult<Task> result = controller.GetTaskById(id);    

            var task = result.Value;
            Assert.IsNotNull(task);
            Assert.AreEqual(taskToFind.Id, task.Id);
            Assert.AreEqual(taskToFind.Title, task.Title);
        }

        [TestMethod()]
        public void DeleteTaskTest()
        {
            Guid id = Guid.NewGuid();
            service.Setup(s => s.DeleteTask(It.IsAny<Guid>()))
                .Verifiable();

            IActionResult result = controller.DeleteTask(id);

            service.Verify(s => s.DeleteTask(It.IsAny<Guid>()), Times.Once());
            var ok = result as OkResult;
            Assert.IsNotNull(ok);
            Assert.AreEqual(200, ok.StatusCode);
        }

        [TestMethod()]
        public void SaveTaskTest()
        {
            Guid userId = Guid.NewGuid();
            int statusId = 2;
            Guid id = Guid.NewGuid();
            Task savedTask = new Task { Id = id, UserId = userId, Title = "Title", CreationDate = DateOnly.Parse("2025-09-01"), StatusId = statusId };
            Task taskToSave = new Task {UserId = userId, Title = "Title", CreationDate = DateOnly.Parse("2025-09-01"), StatusId = statusId };

            service.Setup(s => s.Save(It.IsAny<Task>()))
                .Returns(savedTask);

            ActionResult<Task> taskResult = controller.SaveTask(taskToSave);

            var task = taskResult.Value;
            Assert.IsNotNull(task);
            Assert.AreEqual(savedTask.Title, task.Title);
            Assert.AreEqual(savedTask.CreationDate, task.CreationDate);
            Assert.AreEqual(savedTask.UserId, task.UserId);
            Assert.AreEqual(savedTask.StatusId, task.StatusId);
        }

        [TestMethod()]
        public void UpdateTaskTest()
        {
            Guid id = Guid.Parse("1543f9e2-8351-11f0-829d-00505692e06f");
            Task initialTask = new Task { Id = id, Title = "Title", CreationDate = DateOnly.Parse("2025-09-01"), StatusId = 2 };
            Task newTask = new Task { Title = "new Title", StatusId = 3 };
            Task updatedTask = new Task { Id = id, Title = "new Title", CreationDate = DateOnly.Parse("2025-09-01"), StatusId = 3 };
            
            service.Setup(s => s.FindTaskById(It.IsAny<Guid>()))
                .Returns(initialTask);
            service.Setup(s => s.UpdateTask(It.IsAny<Guid>(), It.IsAny<Task>()))
                .Returns(updatedTask);

            ActionResult<Task> okResult = controller.UpdateTask(id, newTask);

            var task = okResult.Value as Task;
            Assert.IsNotNull(task);
            Assert.AreEqual(updatedTask.Title, task.Title);
            Assert.AreEqual(updatedTask.StatusId,task.StatusId);
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

            service.Setup(s => s.GetPaginatedTasks(It.IsAny<Dictionary<string, object>>()))
                .Returns(tasks.Slice(0, 4));

            IActionResult result = controller.GetPaginatedTasks(details);
            var ok = result as OkObjectResult;
            Assert.IsNotNull(ok);
            Assert.AreEqual(200, ok.StatusCode);
            var value = ok.Value;
            var dict = JsonSerializer.Deserialize<Dictionary<string, object>>(JsonSerializer.Serialize(value));
            Assert.IsTrue(dict.ContainsKey("paginatedItems"));
            Assert.IsTrue(dict.ContainsKey("totalPages"));
        }
    }
}