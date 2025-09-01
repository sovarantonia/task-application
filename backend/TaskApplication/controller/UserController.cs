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
            User result = UserService.FindUserById(id);
            return result == null? NotFound() : Ok(result);
        }

        [HttpPost]
        public ActionResult<User> SaveUser([FromBody] User userToSave)
        {
            var savedUser = UserService.SaveUser(userToSave);
            return savedUser == null ? BadRequest() : Ok(savedUser);
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
            var updatedUser = UserService.UpdateUser(id, userToUpdate);
            return updatedUser == null ? BadRequest() : Ok(updatedUser);
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
