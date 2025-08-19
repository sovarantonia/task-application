namespace TaskApplication.entity
{
    public class Task
    {
        public String Id { get; set; }
        public String Title { get; set; }
        public String Description { get; set; }
        public DateTime CreationDate { get; set; }
        public User User { get; set; }
        public Status Status { get; set; }

        public Task(String taskId, String title, String description, DateTime creationDate, User user, Status status)
        {
            Id = taskId;
            Title = title;
            Description = description;
            CreationDate = creationDate;
            User = user;
            Status = status;
        }

        public Task()
        {

        }

        public override String ToString()
        {
            return String.Format("Title: {0}, Description: {1}, Assigned to: {2}, Created at: {3}, Status: {4}", 
                Title, Description, User.ToString(), CreationDate.ToString(), Status.ToString());
        }
    }
}
