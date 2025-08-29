using TaskApplication.entity;

namespace TaskApplication.repository
{
    public interface IUserRepository : IRepository<User>
    {
        public User FindUserByEmail(string email);
    }
}
