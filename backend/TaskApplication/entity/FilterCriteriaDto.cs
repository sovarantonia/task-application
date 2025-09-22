using System.Text.Json.Serialization;

namespace TaskApplication.entity
{
    public class FilterCriteriaDto
    {
        public string Property { get; set; } = "";
        public object[] Values { get; set; } = Array.Empty<object>();
        public FilterOption FilterOption { get; set; }
    }
}
