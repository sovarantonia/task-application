using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using TaskApplication.entity;
using TaskApplication.service;

namespace TaskApplication.controller
{
    [ApiController]
    [Route("[controller]")]
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

        [HttpPost]
        public ActionResult<User> SaveUser([FromBody] User userToSave)
        {
            var savedUser = UserService.SaveUser(userToSave);
            return savedUser == null ? BadRequest() : savedUser;
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
        public List<User> GetAllUsers()
        {
            return UserService.GetAllUsers();
        }


    }
}
