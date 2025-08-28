using TaskApplication.entity;

namespace TaskApplication.service
{
    public class StatusService
    {
        private Service<Status> Service = new Service<Status>("statuses");

        public List<Status> GetAllStatuses()
        {
            return Service.GetAllItems();
        }
    }
}
