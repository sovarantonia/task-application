using Task = TaskApplication.entity.Task;

namespace TaskApplication.service
{
    public class TaskService
    {
        public Repository<Task> taskRepository;

        public TaskService(DbConnection dbConnection)
        {
            taskRepository = new Repository<entity.Task>(dbConnection, "tasks");
        }

        public void Save()
        {

        }

        public Task FindTaskById(string id)
        {
            return taskRepository.FindById(Guid.Parse(id));
        }

        public void DeleteTask(string id)
        {
            taskRepository.Delete(Guid.Parse(id));
        }

        public void UpdateTask()
        {

        }
    }
}
