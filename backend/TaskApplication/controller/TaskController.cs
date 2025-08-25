using Microsoft.AspNetCore.Mvc;
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
        public ActionResult<entity.Task> SaveTask([FromBody] Task taskToSave)
        {
            return TaskService.Save(taskToSave);
        }

        
        [HttpPut("{id:guid}")]
        public ActionResult<Task> UpdateTask(Guid id, [FromBody] Task taskToUpdate)
        {
            return TaskService.UpdateTask(id, taskToUpdate);
        }


        [HttpGet]
        [Route ("/list")]
        public ActionResult<List<Task>> GetPaginatedTasks([FromQuery] int currentPageNo, [FromQuery] int itemsPerPage)
        {
            return TaskService.GetPaginatedTasks(currentPageNo, itemsPerPage, new Dictionary<string, int>(), new Dictionary<string, string>());
        }
    }
}
