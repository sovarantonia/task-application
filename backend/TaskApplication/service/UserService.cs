namespace TaskApplication.service
{
    using Microsoft.AspNetCore.Mvc;
    using TaskApplication.entity;
    using TaskApplication.repository;

    public class UserService
    {
        public Service<User> Service = new Service<User>("users");

        public User SaveUser(User userToSave)
        {
            return Service.Save(userToSave);
        }

        public User FindUserById(Guid id)
        {
            return Service.FindById(id);
        }

        public void DeleteUser(Guid id)
        {
            Service.Delete(id);
        }

        public User UpdateUser(Guid id, User userToUpdate)
        {
            return Service.Update(id, userToUpdate);
        }

        public List<User> GetPaginatedUsers(Dictionary<string, object> paginationDetails)
        {
            return Service.GetPaginatedItems(paginationDetails);
        }

        public long GetTotalUsersNo()
        {
            return Service.GetTotalItemsNo();
        }

    }
}
