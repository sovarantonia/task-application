using Microsoft.AspNetCore.Mvc;
using TaskApplication.entity.exceptions;
using TaskApplication.filter_midw;
using TaskApplication.repository;
using Task = TaskApplication.entity.Task;

namespace TaskApplication.service
{
    public class TaskService : ITaskService
    {
        private ITaskRepository TaskRepository;
        private PaginationDetails PaginationDetails = new PaginationDetails();


        public TaskService(ITaskRepository repository)
        {
            this.TaskRepository = repository;
        }

        [TaskAuthorization]
        public Task Save(Task taskToSave)
        {
            return TaskRepository.Save(taskToSave);
        }

        public Task FindTaskById(Guid id)
        {
            return TaskRepository.FindByIdOrThrow(id);
        }

        public void DeleteTask(Guid id)
        {
            TaskRepository.FindByIdOrThrow(id);
            TaskRepository.Delete(id);
        }

        public Task UpdateTask(Guid id, Task taskToUpdate)
        {
            TaskRepository.FindByIdOrThrow(id);

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
