namespace TaskApplication.service
{
    using TaskApplication.entity;
    using TaskApplication.repository;

    public class UserService : IUserService
    {
        private IUserRepository UserRepository;
        private PaginationDetails PaginationDetails = new PaginationDetails();

        public UserService(IUserRepository repository)
        {
            this.UserRepository = repository;
        }

        public bool ValidateUser(User userToSave)
        {
            var foundUser = UserRepository.FindUserByEmail(userToSave.Email);
            if (foundUser != null)
            {
                return false;
            }
            return true;
        }
        
        public User SaveUser(User userToSave)
        {
            if (ValidateUser(userToSave))
            {
                return UserRepository.Save(userToSave);
            }

            return null;
        }

        public User FindUserById(Guid id)
        {
            return UserRepository.FindById(id);
        }

        public void DeleteUser(Guid id)
        {
            UserRepository.Delete(id);
        }

        public User UpdateUser(Guid id, User userToUpdate)
        {
            return UserRepository.Update(id, userToUpdate);
        }

        public List<User> GetPaginatedUsers(Dictionary<string, object> paginationDetails)
        {
            PaginationDetails.ExtractPaginationDetails(paginationDetails);
            return UserRepository.GetPaginatedItems(PaginationDetails.CurrentPageNo, PaginationDetails.ItemsPerPage, PaginationDetails.SortCriteria, PaginationDetails.FilterCriteria);
        }

        public long GetTotalUsersNo()
        {
            return UserRepository.GetTotalItemsNo();
        }

        public List<User> GetAllUsers()
        {
            return UserRepository.GetAllItems();
        }

    }
}
