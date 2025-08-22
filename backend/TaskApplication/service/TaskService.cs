using Task = TaskApplication.entity.Task;

namespace TaskApplication.service
{
    public class TaskService(DbConnection dbConnection)
    {
        public Repository<Task> TaskRepository = new Repository<entity.Task>(dbConnection, "tasks");

        public void Save()
        {

        }

        public Task FindTaskById(string id)
        {
            return TaskRepository.FindById(Guid.Parse(id));
        }

        public void DeleteTask(string id)
        {
            TaskRepository.Delete(Guid.Parse(id));
        }

        public void UpdateTask()
        {

        }

        public List<Task> GetPaginatedTasks(int currentPageNo, int itemsPerPage, Dictionary<string, int> sortCriteria, Dictionary<string, string> filterCriteria)
        {
            return TaskRepository.GetPaginatedItems(currentPageNo, itemsPerPage, sortCriteria, filterCriteria);
        }

       
    }
}
