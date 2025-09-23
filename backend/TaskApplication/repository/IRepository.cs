using TaskApplication.entity.dto;

namespace TaskApplication.repository
{
    public interface IRepository<T> where T: class
    {
        public T Save(T entity);
        public T? FindById(Guid id);
        public void Delete(Guid id);
        public T Update(Guid id, T entity);
        public List<T> GetPaginatedItems(int currentPageNo, int itemsPerPage, Dictionary<string, int> sortCriteria, List<FilterGroupDto> filterGroup);
        public long GetTotalItemsNo();
        public List<T> GetAllItems();
        public T? SetItemProperties(MySqlConnector.MySqlDataReader reader);
        public T FindByIdOrThrow(Guid id);
        public string BuildFilterCriteriaUnit(FilterCriteriaDto filter);
        public string BuildWhereFilterCriteria(List<FilterGroupDto> filters);
        public string BuildFilterCriteriaGroup(FilterGroupDto group);
        public string ToSqlLiteral(object? value);
    }
}
