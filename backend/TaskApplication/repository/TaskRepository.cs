using Task = TaskApplication.entity.Task;

namespace TaskApplication.repository
{
    public class TaskRepository : Repository<Task>, ITaskRepository
    {
        public TaskRepository() : base("tasks")
        {

        }
    }
}
