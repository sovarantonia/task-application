using Microsoft.AspNetCore.Mvc;
using TaskApplication.entity;
using TaskApplication.service;

namespace TaskApplication.controller
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        public UserService UserService = new UserService();


        [HttpGet]
        public ActionResult<User> GetUserById([FromQuery] Guid id)
        {
            return UserService.FindUserById(id);
        }

        [HttpPost]
        public ActionResult<User> SaveUser([FromBody] User userToSave)
        {
            return UserService.SaveUser(userToSave);
        }

        [HttpDelete]
        public IActionResult DeleteUser([FromQuery] Guid id)
        {
            UserService.DeleteUser(id);
            return Ok();
        }

        [HttpPut]
        public ActionResult<User> UpdateUser([FromBody] User userToUpdate)
        {
            return UserService.UpdateUser(userToUpdate);   
        }

        [HttpGet]
        [Route("list")]
        public ActionResult<List<User>> GetPaginatedUsers([FromQuery] int currentPageNo, [FromQuery] int itemsPerPage)
        {
            return UserService.GetPaginatedUsers(currentPageNo, itemsPerPage, new Dictionary<string, int>(), new Dictionary<string, string>());
        }


    }
}
