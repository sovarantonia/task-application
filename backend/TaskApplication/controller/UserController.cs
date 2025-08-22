using Microsoft.AspNetCore.Mvc;
using TaskApplication.entity;
using TaskApplication.service;

namespace TaskApplication.controller
{
    [ApiController]
    [Route("[controller]")]
    public class UserController(DbConnection connection) : ControllerBase
    {
        public UserService UserService = new UserService(connection);



        [HttpGet("{id:guid}")]
        public ActionResult<User> GetUserById(Guid id)
        {
            return UserService.FindUserById(id);
        }
    }
}
