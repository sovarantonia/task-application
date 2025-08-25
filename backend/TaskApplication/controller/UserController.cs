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


        [HttpGet("{id:guid}")]
        public ActionResult<User> GetUserById(Guid id)
        {
            return UserService.FindUserById(id);
        }

        [HttpPost]
        public ActionResult<User> SaveUser([FromBody] User userToSave)
        {
            return UserService.SaveUser(userToSave);
        }

        [HttpDelete("{id:guid}")]
        public IActionResult DeleteUser(Guid id)
        {
            UserService.DeleteUser(id);
            return Ok();
        }

        [HttpPut("{id:guid}")]
        public ActionResult<User> UpdateUser(Guid id, [FromBody] User userToUpdate)
        {
            return UserService.UpdateUser(id, userToUpdate);
        }

        [HttpGet]
        [Route("list")]
        public ActionResult<List<User>> GetPaginatedUsers([FromQuery] int currentPageNo, [FromQuery] int itemsPerPage)
        {
            return UserService.GetPaginatedUsers(currentPageNo, itemsPerPage, new Dictionary<string, int>(), new Dictionary<string, string>());
        }


    }
}
