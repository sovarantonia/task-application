namespace TaskApplication.entity
{
    public class TaskDto
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string CreationDate { get; set; }
        public string UserId { get; set; }
        public string Status { get; set; }

        public TaskDto(string id, string title, string description, string creationDate, string userId, string status)
        {
            Id = id;
            Title = title;
            Description = description;
            CreationDate = creationDate;
            UserId = userId;
            Status = status;
        }

        public TaskDto(string title, string description, string creationDate, string userId, string status)
        {
            Title = title;
            Description = description;
            CreationDate = creationDate;
            UserId = userId;
            Status = status;
        }
    }
}
