namespace TaskApplication.service
{
    using TaskApplication.entity;
    public class UserService(DbConnection dbConnection)
    {
        public Repository<User> UserRepository { get; set; } = new Repository<User>(dbConnection, "users");

        public void SaveUser()
        {

        }

        public User FindUserById(Guid id)
        {
            return UserRepository.FindById(id);
        }

        public void DeleteUser(string id)
        {
            UserRepository.Delete(Guid.Parse(id));
        }

        public void UpdateUser()
        {

        }

        public List<User> GetPaginatedUsers(int currentPageNo, int itemsPerPage, Dictionary<string, int> sortCriteria, Dictionary<string, string> filterCriteria)
        {
            return UserRepository.GetPaginatedItems(currentPageNo, itemsPerPage, sortCriteria, filterCriteria);
        }

    }
}
