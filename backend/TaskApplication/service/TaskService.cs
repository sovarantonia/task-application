using TaskApplication.repository;
using Task = TaskApplication.entity.Task;

namespace TaskApplication.service
{
    public class TaskService
    {
        public Repository<Task> TaskRepository = new Repository<entity.Task>("tasks");

        public void Save(Task taskToSave)
        {
            TaskRepository.Save(taskToSave);
        }

        public Task FindTaskById(Guid id)
        {
            return TaskRepository.FindById(id);
        }

        public void DeleteTask(Guid id)
        {
            TaskRepository.Delete(id);
        }

        public void UpdateTask(Task taskToUpdate)
        {
            TaskRepository.Update(taskToUpdate);
        }

        public List<Task> GetPaginatedTasks(int currentPageNo, int itemsPerPage, Dictionary<string, int> sortCriteria, Dictionary<string, string> filterCriteria)
        {
            return TaskRepository.GetPaginatedItems(currentPageNo, itemsPerPage, sortCriteria, filterCriteria);
        }

       
    }
}
