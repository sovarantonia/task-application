namespace TaskApplication.service
{
    using TaskApplication.entity;
    using TaskApplication.repository;

    public class UserService
    {
        public Repository<User> UserRepository = new Repository<User>("users");

        public void SaveUser(User userToSave)
        {
            UserRepository.Save(userToSave);
        }

        public User FindUserById(Guid id)
        {
            return UserRepository.FindById(id);
        }

        public void DeleteUser(Guid id)
        {
            UserRepository.Delete(id);
        }

        public void UpdateUser(User userToUpdate)
        {
            UserRepository.Update(userToUpdate);
        }

        public List<User> GetPaginatedUsers(int currentPageNo, int itemsPerPage, Dictionary<string, int> sortCriteria, Dictionary<string, string> filterCriteria)
        {
            return UserRepository.GetPaginatedItems(currentPageNo, itemsPerPage, sortCriteria, filterCriteria);
        }

    }
}
