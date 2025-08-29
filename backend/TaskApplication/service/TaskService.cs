using TaskApplication.repository;
using Task = TaskApplication.entity.Task;

namespace TaskApplication.service
{
    public class TaskService
    {
        private TaskRepository TaskRepository = new TaskRepository();
        private PaginationDetails PaginationDetails = new PaginationDetails();

        public Task Save(Task taskToSave)
        {
            return TaskRepository.Save(taskToSave);
        }

        public Task FindTaskById(Guid id)
        {
            return TaskRepository.FindById(id);
        }

        public void DeleteTask(Guid id)
        {
            TaskRepository.Delete(id);
        }

        public Task UpdateTask(Guid id, Task taskToUpdate)
        {
            return TaskRepository.Update(id, taskToUpdate);
        }

        public List<Task> GetPaginatedTasks(Dictionary<string, object> paginationDetails)
        {
            PaginationDetails.ExtractPaginationDetails(paginationDetails);
            return TaskRepository.GetPaginatedItems(PaginationDetails.CurrentPageNo, PaginationDetails.ItemsPerPage, PaginationDetails.SortCriteria, PaginationDetails.FilterCriteria);
        }

        public long GetTotalTasksNo()
        {
            return TaskRepository.GetTotalItemsNo();
        }

    }
}
