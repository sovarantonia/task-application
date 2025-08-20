namespace TaskApplication.entity
{
    public class UserDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Department { get; set; }

        public UserDto(string userId, string name, string email, string department)
        {
            Id = userId;
            Name = name;
            Email = email;
            Department = department;
        }

        public UserDto(string name, string email, string department)
        {
            Name = name;
            Email = email;
            Department = department;
        }
    }
}
