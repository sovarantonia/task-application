using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using TaskApplication.service;
using Task = TaskApplication.entity.Task;

namespace TaskApplication.controller
{
    [Route("[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private ITaskService TaskService;

        public TaskController(ITaskService service)
        {
            this.TaskService = service;
        }

        [HttpGet("{id:guid}")]
        public ActionResult<entity.Task> GetTaskById(Guid id)
        {
            Task result = TaskService.FindTaskById(id);
            return result == null ? NotFound() : Ok(result);
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


        [HttpPatch("{id:guid}")]
        public ActionResult<Task> UpdateTask(Guid id, [FromBody] Task taskToUpdate)
        {
            Task result = TaskService.UpdateTask(id, taskToUpdate);
            return result == null ? BadRequest() : Ok(result);
        }


        [HttpPost]
        [Route("list")]
        public IActionResult GetPaginatedTasks([FromBody] Dictionary<string, object> paginationDetails)
        {
            int itemsPerPage = ((JsonElement)paginationDetails["itemsPerPage"]).GetInt32();
            return Ok(new { paginatedItems = TaskService.GetPaginatedTasks(paginationDetails), totalPages = Math.Ceiling(TaskService.GetTotalTasksNo() * 1.0 / itemsPerPage) });
        }
    }
}
