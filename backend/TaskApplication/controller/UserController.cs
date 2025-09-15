using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using TaskApplication.entity;
using TaskApplication.filter_midw;
using TaskApplication.service;

namespace TaskApplication.controller
{
    [ApiController]
    [Route("[controller]")]
    [TypeFilter(typeof(LogActionFilter))]
    public class UserController : ControllerBase
    {
        private IUserService UserService;

        public UserController(IUserService service)
        {
            this.UserService = service;
        }

        [HttpGet("{id:guid}")]
        public ActionResult<User> GetUserById(Guid id)
        {
            return UserService.FindUserById(id);
        }

        [HttpGet("{email}")]
        public ActionResult<User> GetUserByEmail(string email)
        {
            return UserService.FindUserByEmail(email);
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

        [HttpPatch("{id:guid}")]
        public ActionResult<User> UpdateUser(Guid id, [FromBody] User userToUpdate)
        {
            return UserService.UpdateUser(id, userToUpdate);
        }

        [HttpPost]
        [Route("list")]
        public IActionResult GetPaginatedUsers([FromBody] Dictionary<string, object> paginationDetails)
        {
            int itemsPerPage = ((JsonElement)paginationDetails["itemsPerPage"]).GetInt32();

            return Ok(new { paginatedItems = UserService.GetPaginatedUsers(paginationDetails), totalPages = Math.Ceiling(UserService.GetTotalUsersNo() * 1.0 /  itemsPerPage)});
        }

        [HttpGet]
        public ActionResult<List<User>> GetAllUsers()
        {
            return Ok(UserService.GetAllUsers());
        }


    }
}
