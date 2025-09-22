using System.Text.Json;
using TaskApplication.entity;

namespace TaskApplication.service
{
    public class PaginationDetails
    {
        public int CurrentPageNo { get; set; }
        public int ItemsPerPage { get; set; }
        public Dictionary<string, int> SortCriteria { get; set; } = new Dictionary<string, int>();
        public List<FilterCriteriaDto> FilterCriteria { get; set; } = new List<FilterCriteriaDto>();

        public void ExtractPaginationDetails(Dictionary<string, object> paginationDetails)
        {
            var jsonOptions = new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            };

            CurrentPageNo = ((JsonElement)paginationDetails["currentPageNo"]).GetInt32();
            ItemsPerPage = ((JsonElement)paginationDetails["itemsPerPage"]).GetInt32();
            var sortText = JsonSerializer.Deserialize<List<SortCriteriaDto>>(
    ((JsonElement)paginationDetails["sortCriteria"]), jsonOptions);
            FilterCriteria = JsonSerializer.Deserialize<List<FilterCriteriaDto>>(
    ((JsonElement)paginationDetails["filterCriteria"]), jsonOptions);


            foreach (var item in sortText)
            {
                SortCriteria[item.Property] = item.Direction;
                if (item.Direction == 0)
                {
                    SortCriteria.Remove(item.Property);
                }
            }
        }
    }
}
