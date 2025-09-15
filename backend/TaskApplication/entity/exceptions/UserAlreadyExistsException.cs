namespace TaskApplication.entity.exceptions
{
    public class UserAlreadyExistsException : Exception
    {
        public UserAlreadyExistsException() { }
        public UserAlreadyExistsException(string message) : base(message) { }

        public UserAlreadyExistsException(string message, Exception inner) : base(message, inner) { }
    }
}
