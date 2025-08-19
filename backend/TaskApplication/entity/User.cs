namespace TaskApplication.entity
{
    public class User
    { 
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Department { get; set; }

        public User(string userId, string name, string email, string department)
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
            return String.Format("User name: {0}, email: {1}, department: {2}", this.Name, this.Email, this.Department);
        }
    }
    
}
