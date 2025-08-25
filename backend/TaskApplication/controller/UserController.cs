using Microsoft.AspNetCore.Mvc;
using TaskApplication.entity;
using TaskApplication.service;

namespace TaskApplication.controller
{
    [ApiController]
    [Route("[controller]")]
    public class UserController: ControllerBase
    {
        public UserService UserService = new UserService();


        [HttpGet]
        public ActionResult<User> GetUserById([FromQuery] Guid id)
        {
            return UserService.FindUserById(id);
        }

        [HttpDelete]
        public IActionResult DeleteUser([FromQuery] Guid id)
        {
            UserService.DeleteUser(id);
            return Ok();
        }

        //[HttpGet]
        //public ActionResult<List<User>> GetPaginatedUsers()
    }
}
