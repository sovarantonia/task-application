using Microsoft.AspNetCore.Mvc;
using Org.BouncyCastle.Utilities;
using System.Text.Json;
using TaskApplication.entity;
using TaskApplication.service;
using Task = TaskApplication.entity.Task;

namespace TaskApplication.controller
{
    [Route("[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        public TaskService TaskService = new TaskService();

        [HttpGet("{id:guid}")]
        public ActionResult<entity.Task> GetTaskById(Guid id)
        {
            return TaskService.FindTaskById(id);
        }


        [HttpDelete("{id:guid}")]
        public IActionResult DeleteTask(Guid id)
        {
            TaskService.DeleteTask(id);
            return Ok();
        }


        [HttpPost]
        public ActionResult<Task> SaveTask([FromBody] Task taskToSave)
        {
            return TaskService.Save(taskToSave);
        }


        [HttpPut("{id:guid}")]
        public ActionResult<Task> UpdateTask(Guid id, [FromBody] Task taskToUpdate)
        {
            return TaskService.UpdateTask(id, taskToUpdate);
        }


        [HttpGet]
        [Route("list")]
        public ActionResult<List<Task>> GetPaginatedTasks([FromBody] Dictionary<string, object> paginationDetails)
        {
            int currentPageNo = ((JsonElement)paginationDetails["currentPageNo"]).GetInt32();
            int itemsPerPage = ((JsonElement)paginationDetails["itemsPerPage"]).GetInt32();
            var sortText = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(
    ((JsonElement)paginationDetails["sortCriteria"]).GetRawText());
            var filterText = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(
    ((JsonElement)paginationDetails["filterCriteria"]).GetRawText());

            Dictionary<string, int> sortCriteria = new Dictionary<string, int>();
            Dictionary<string, string> filterCriteria = new Dictionary<string, string>();

            foreach (var item in sortText)
            {
                var property = item["property"].ToString();
                var direction = ((JsonElement)item["direction"]).GetInt32();
                sortCriteria.Add(property, direction);
            }

            foreach (var item in filterText)
            {
                var property = item["property"].ToString();
                var value = item["value"].ToString();
                filterCriteria.Add(property, value);
            }

            return TaskService.GetPaginatedTasks(currentPageNo, itemsPerPage, sortCriteria, filterCriteria);
        }
    }
}
