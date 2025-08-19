namespace TaskApplication.entity
{
    public class User
    { 
        public String Id { get; set; }
        public String Name { get; set; }
        public String Email { get; set; }
        public String Department { get; set; }

        public User(String userId, String name, String email, String department)
        {
            Id = userId;
            Name = name;
            Email = email;
            Department = department;
        }

        public User()
        {

        }

        public override String ToString()
        {
            return String.Format("User name: {0}, email: {1}, department: {2}", this.Name, this.Email, this.Department);
        }
    }
    
}
