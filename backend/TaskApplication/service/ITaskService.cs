namespace TaskApplication.service

{
    using TaskApplication.filter_midw;
    using Task = TaskApplication.entity.Task;
    public interface ITaskService
    {
        [TaskAuthorization(emailList: ["admin@admin.com"])]
        public Task Save(Task taskToSave, string emailCookie);
        public Task FindTaskById(Guid id);
        public void DeleteTask(Guid id);
        public Task UpdateTask(Guid id, Task taskToUpdate);
        public List<Task> GetPaginatedTasks(Dictionary<string, object> paginationDetails);
        public long GetTotalTasksNo();
    }
}
