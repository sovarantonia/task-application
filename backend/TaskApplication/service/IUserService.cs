using TaskApplication.entity;

namespace TaskApplication.service
{
    public interface IUserService
    {
        public bool ValidateUser(User userToSave);
        public User SaveUser(User userToSave);
        public User FindUserById(Guid id);
        public void DeleteUser(Guid id);
        public User UpdateUser(Guid id, User userToUpdate);
        public List<User> GetPaginatedUsers(Dictionary<string, object> paginationDetails);
        public long GetTotalUsersNo();
        public List<User> GetAllUsers();
    }
}
