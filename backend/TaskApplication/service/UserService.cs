namespace TaskApplication.service
{
    using TaskApplication.entity;
    public class UserService
    {
        public Repository<User> userRepository { get; set; }

        public UserService(DbConnection dbConnection)
        {
            userRepository = new Repository<User>(dbConnection, "users");
        }

        public void SaveUser()
        {

        }

        public User FindUserById(string id)
        {
            return userRepository.FindById(Guid.Parse(id));
        }

        public void DeleteUser(string id)
        {
            userRepository.Delete(Guid.Parse(id));
        }

        public void UpdateUser()
        {

        }

    }
}
