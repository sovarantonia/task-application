using Task = TaskApplication.entity.Task;

namespace TaskApplication.service
{
    public class TaskService
    {
        private Service<Task> Service = new Service<entity.Task>("tasks");

        public Task Save(Task taskToSave)
        {
            return Service.Save(taskToSave);
        }

        public Task FindTaskById(Guid id)
        {
            return Service.FindById(id);
        }

        public void DeleteTask(Guid id)
        {
            Service.Delete(id);
        }

        public Task UpdateTask(Guid id, Task taskToUpdate)
        {
            return Service.Update(id, taskToUpdate);
        }

        public List<Task> GetPaginatedTasks(Dictionary<string, object> paginationDetails)
        {
            return Service.GetPaginatedItems(paginationDetails);
        }

        public long GetTotalTasksNo()
        {
            return Service.GetTotalItemsNo();
        }

    }
}
