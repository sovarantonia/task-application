using TaskApplication.entity;
using TaskApplication.repository;

namespace TaskApplication.service
{
    public class StatusService
    {
        private Repository<Status> StatusRepository = new Repository<Status>("statuses");

        public List<Status> GetAllStatuses()
        {
            return StatusRepository.GetAllItems();
        }
    }
}
