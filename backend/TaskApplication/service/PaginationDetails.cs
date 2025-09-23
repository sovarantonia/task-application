using System.Text.Json;
using TaskApplication.entity;
using TaskApplication.entity.dto;

namespace TaskApplication.service
{
    public class PaginationDetails
    {
        public int CurrentPageNo { get; set; }
        public int ItemsPerPage { get; set; }
        public Dictionary<string, int> SortCriteria { get; set; } = new Dictionary<string, int>();
        public List<FilterGroupDto> FilterGroup { get; set; } = new List<FilterGroupDto>();

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
            FilterGroup = JsonSerializer.Deserialize<List<FilterGroupDto>>(
    ((JsonElement)paginationDetails["filterGroup"]), jsonOptions);


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
