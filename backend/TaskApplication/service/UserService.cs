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
            User? result =  UserRepository.FindUserByEmail(email);
            if(result == null)
            {
                throw new EntityNotFoundException($"User with email {email} not found");
            }

            return result;
        }

        public User FindUserById(Guid id)
        {
            User? result = UserRepository.FindById(id);
            if (result == null)
            {
                throw new EntityNotFoundException($"User with id {id} not found");
            }

            return result;
        }

        public void DeleteUser(Guid id)
        {
            FindUserById(id);
            UserRepository.Delete(id);
        }

        public User UpdateUser(Guid id, User userToUpdate)
        {
            ValidateUser(userToUpdate);

            FindUserById(id);

            return UserRepository.Update(id, userToUpdate);
        }

        public List<User> GetPaginatedUsers(Dictionary<string, object> paginationDetails)
        {
            PaginationDetails.ExtractPaginationDetails(paginationDetails);
            return UserRepository.GetPaginatedItems(PaginationDetails.CurrentPageNo, PaginationDetails.ItemsPerPage, PaginationDetails.SortCriteria, PaginationDetails.FilterGroup);
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
