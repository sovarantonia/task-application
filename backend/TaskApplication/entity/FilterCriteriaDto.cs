using System.Text.Json.Serialization;

namespace TaskApplication.entity
{
    public class FilterCriteriaDto
    {
        public string Property { get; set; } = "";
        public object?[] Values { get; set; } = Array.Empty<object?>();

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public Operator Operator { get; set; }
        public bool Negate { get; set; } = false;
    }
}
