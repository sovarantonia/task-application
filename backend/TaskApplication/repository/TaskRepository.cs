using Task = TaskApplication.entity.Task;

namespace TaskApplication.repository
{
    public class TaskRepository : Repository<Task>
    {
        public TaskRepository() : base("tasks")
        {

        }
    }
}
