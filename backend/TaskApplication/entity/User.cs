namespace TaskApplication.entity
{
    public class User
    { 
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Department { get; set; }

        public User(Guid userId, string name, string email, string department)
        {
            Id = userId;
            Name = name;
            Email = email;
            Department = department;
        }

        public User(string name, string email, string department)
        {
            Name = name;
            Email = email;
            Department = department;
        }

        public User()
        {

        }

        public override string ToString()
        {
            return $"Id: {Id}, User name: {Name}, email: {Email}, department: {Department}"; 
        }
    }
    
}
