namespace TaskApplication.service

{
    using Task = TaskApplication.entity.Task;
    public interface ITaskService
    {
        public Task Save(Task taskToSave);
        public Task FindTaskById(Guid id);
        public void DeleteTask(Guid id);
        public Task UpdateTask(Guid id, Task taskToUpdate);
        public List<Task> GetPaginatedTasks(Dictionary<string, object> paginationDetails);
        public long GetTotalTasksNo();
    }
}
