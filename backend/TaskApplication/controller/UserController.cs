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
        //[Route("all")]
        public List<User> GetAllUsers()
        {
            return UserService.GetAllUsers();
        }


    }
}
