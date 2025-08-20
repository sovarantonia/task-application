namespace TaskApplication.entity
{
    public class Task
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateOnly CreationDate { get; set; }
        public Guid UserId { get; set; }
        public int StatusId { get; set; }

        public Task(Guid taskId, string title, string description, DateOnly creationDate, Guid userId, int statusId)
        {
            Id = taskId;
            Title = title;
            Description = description;
            CreationDate = creationDate;
            UserId = userId;
            StatusId = statusId;
        }

        public Task(string title, string description, DateOnly creationDate, Guid userId, int statusId)
        {
            Title = title;
            Description = description;
            CreationDate = creationDate;
            UserId = userId;
            StatusId = statusId;
        }

        public Task()
        {

        }

        public override string ToString()
        {
            return String.Format("Title: {0}, Description: {1}, Assigned to: {2}, Created at: {3}, Status: {4}", 
                Title, Description, UserId.ToString(), CreationDate.ToString(), StatusId.ToString());
        }
    }
}
