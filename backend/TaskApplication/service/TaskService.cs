using Microsoft.AspNetCore.Mvc;
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

        [TaskAuthorization(emailList: ["admin@admin.com"] )]
        public Task Save(Task taskToSave, string emailCookie)
        {
            var attribute = (TaskAuthorizationAttribute)typeof(TaskService).GetMethod("Save").GetCustomAttributes(typeof(TaskAuthorizationAttribute), false).FirstOrDefault();
            foreach (var email in attribute.AdminEmailList.FirstOrDefault())
            {
                if (emailCookie.Equals(email)) 
                {
                    return TaskRepository.Save(taskToSave);
                }
            }
            return null;
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
            return FindTaskById(id) != null ? TaskRepository.Update(id, taskToUpdate) : null;
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
