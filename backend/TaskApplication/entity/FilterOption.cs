using System.Text.Json.Serialization;

namespace TaskApplication.entity
{
    public class FilterOption
    {
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public Operator Operator { get; set; }
        public bool IsNegated { get; set; } = false;
    }
}
