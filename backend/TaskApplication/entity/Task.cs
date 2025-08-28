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

        //public Task(Guid taskId, string title, string description, DateOnly creationDate, Guid userId, int statusId)
        //{
        //    Id = taskId;
        //    Title = title;
        //    Description = description;
        //    CreationDate = creationDate;
        //    UserId = userId;
        //    StatusId = statusId;
        //}

        //public Task(string title, string description, DateOnly creationDate, Guid userId, int statusId)
        //{
        //    Title = title;
        //    Description = description;
        //    CreationDate = creationDate;
        //    UserId = userId;
        //    StatusId = statusId;
        //}

        public Task()
        {

        }

        public override string ToString()
        {
            return $"Id: {Id} Title: {Title}, Description: {Description}, Assigned to: {UserId}, Created at: {CreationDate}, Status: {StatusId}";
        }
    }
}
