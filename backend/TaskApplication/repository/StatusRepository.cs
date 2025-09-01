using TaskApplication.entity;

namespace TaskApplication.repository
{
    public class StatusRepository : Repository<Status>, IStatusRepository
    {
        public StatusRepository() : base("statuses")
        {

        }
    }
}
