using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using TaskApplication.filter_midw;
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
        [TaskSaveActionFilter]
        public ActionResult<Task> SaveTask([FromBody] Task taskToSave)
        {
            var emailCookie = HttpContext.Request.Cookies["email"].FirstOrDefault();
            Task result = TaskService.Save(taskToSave, emailCookie);
            return result == null ? Unauthorized() : Ok(result);
        }


        [HttpPatch("{id:guid}")]
        public ActionResult<Task> UpdateTask(Guid id, [FromBody] Task taskToUpdate)
        {
            Task result = TaskService.UpdateTask(id, taskToUpdate);
            return result == null ? NotFound() : Ok(result);
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
