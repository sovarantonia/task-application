using Microsoft.AspNetCore.Mvc;
using TaskApplication.entity;
using TaskApplication.service;

namespace TaskApplication.controller
{
    [Route("[controller]")]
    [ApiController]
    public class StatusController : ControllerBase
    {
        public StatusService StatusService = new StatusService();

        [HttpGet]
        public List<Status> GetAllStatuses()
        {
            return StatusService.GetAllStatuses();
        }
    }
}
