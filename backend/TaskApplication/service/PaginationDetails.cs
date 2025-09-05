using System.Text.Json;

namespace TaskApplication.service
{
    public class PaginationDetails
    {
        public int CurrentPageNo { get; set; }
        public int ItemsPerPage { get; set; }
        public Dictionary<string, int> SortCriteria { get; set; } = new Dictionary<string, int>();
        public Dictionary<string, string> FilterCriteria { get; set; } = new Dictionary<string, string>();

        public void ExtractPaginationDetails(Dictionary<string, object> paginationDetails)
        {
            CurrentPageNo = ((JsonElement)paginationDetails["currentPageNo"]).GetInt32();
            ItemsPerPage = ((JsonElement)paginationDetails["itemsPerPage"]).GetInt32();
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
                SortCriteria[property] = direction;
                if (direction == 0)
                {
                    SortCriteria.Remove(property);
                }
            }

            foreach (var item in filterText)
            {
                var property = item["property"].ToString();
                var value = item["value"].ToString();
                FilterCriteria[property] = value;
                if (value.Equals("All", StringComparison.CurrentCultureIgnoreCase))
                {
                    FilterCriteria.Remove(property);
                }
            }
        }
    }
}
