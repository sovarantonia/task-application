namespace TaskApplication.entity
{
    public class Task
    {
        public Guid Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public DateOnly? CreationDate { get; set; } = DateOnly.FromDateTime(DateTime.Now);
        public Guid? UserId { get; set; }
        public int? StatusId { get; set; } = 1;

        public Task()
        {
            
        }

        public override string ToString()
        {
            return $"Id: {Id} Title: {Title}, Description: {Description}, Assigned to: {UserId}, Created at: {CreationDate}, Status: {StatusId}";
        }
    }
}
