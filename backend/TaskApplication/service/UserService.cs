namespace TaskApplication.service
{
    using TaskApplication.entity;
    using TaskApplication.entity.exceptions;
    using TaskApplication.repository;

    public class UserService : IUserService
    {
        private IUserRepository UserRepository;
        private PaginationDetails PaginationDetails = new PaginationDetails();

        public UserService(IUserRepository repository)
        {
            this.UserRepository = repository;
        }

        public void ValidateUser(User userToSave)
        {
            var foundUser = UserRepository.FindUserByEmail(userToSave.Email);
            if (foundUser != null)
            {
                throw new UserAlreadyExistsException($"User with email {userToSave.Email} already exists");
            }  
        }

        public User SaveUser(User userToSave)
        {
            ValidateUser(userToSave);
            return UserRepository.Save(userToSave);
        }

        public User FindUserByEmail(string email)
        {
            return UserRepository.FindUserByEmailOrThrow(email);
        }

        public User FindUserById(Guid id)
        {
            return UserRepository.FindByIdOrThrow(id);
        }

        public void DeleteUser(Guid id)
        {
            var res = UserRepository.FindByIdOrThrow(id);
            UserRepository.Delete(id);
        }

        public User UpdateUser(Guid id, User userToUpdate)
        {
            ValidateUser(userToUpdate);

            UserRepository.FindByIdOrThrow(id);

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
