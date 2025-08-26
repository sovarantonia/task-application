using System.Text.Json;
using TaskApplication.repository;

namespace TaskApplication.service
{
    public class Service<T>(string tableName)
    {
        public Repository<T> Repository = new Repository<T>(tableName);

        public T Save(T entity)
        {
            return Repository.Save(entity);
        }

        public void Delete(Guid id)
        {
            Repository.Delete(id);
        }

        public T Update(Guid id, T entity)
        {
            return Repository.Update(id, entity);
        }

        public T FindById(Guid id)
        {
            return Repository.FindById(id);
        }

        public List<T> GetPaginatedItems(Dictionary<string, object> paginationDetails)
        {
            int currentPageNo = ((JsonElement)paginationDetails["currentPageNo"]).GetInt32();
            int itemsPerPage = ((JsonElement)paginationDetails["itemsPerPage"]).GetInt32();
            var sortText = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(
    ((JsonElement)paginationDetails["sortCriteria"]).GetRawText());
            var filterText = JsonSerializer.Deserialize<List<Dictionary<string, object>>>(
    ((JsonElement)paginationDetails["filterCriteria"]).GetRawText());

            Dictionary<string, int> sortCriteria = new Dictionary<string, int>();
            Dictionary<string, string> filterCriteria = new Dictionary<string, string>();

            foreach (var item in sortText)
            {
                var property = item["property"].ToString();
                var direction = ((JsonElement)item["direction"]).GetInt32();
                sortCriteria.Add(property, direction);
            }

            foreach (var item in filterText)
            {
                var property = item["property"].ToString();
                var value = item["value"].ToString();
                filterCriteria.Add(property, value);
            }

            return Repository.GetPaginatedItems(currentPageNo, itemsPerPage, sortCriteria, filterCriteria);
        }

        public long GetTotalItemsNo()
        {
            return Repository.GetTotalItemNo();
        }
    }
}
