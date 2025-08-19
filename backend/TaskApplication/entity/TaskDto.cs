namespace TaskApplication.entity
{
    public class TaskDto
    {
        public String Id { get; set; }
        public String Title { get; set; }
        public String Description { get; set; }
        public DateTime CreationDate { get; set; }
        public String UserId { get; set; }
        public Status Status { get; set; }

        public TaskDto(string id, string title, string description, DateTime creationDate, string userId, Status status)
        {
            Id = id;
            Title = title;
            Description = description;
            CreationDate = creationDate;
            UserId = userId;
            Status = status;
        }

        public TaskDto(string title, string description, DateTime creationDate, string userId, Status status)
        {
            Title = title;
            Description = description;
            CreationDate = creationDate;
            UserId = userId;
            Status = status;
        }
    }
}
