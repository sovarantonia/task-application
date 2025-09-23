using System.Text.Json.Serialization;

namespace TaskApplication.entity.dto
{
    public class FilterGroupDto
    {
        [JsonConverter(typeof(JsonStringEnumConverter))]
        public LogicOperator LogicOperator { get; set; } = LogicOperator.And;
        public List<FilterCriteriaDto> FilterCriteria { get; set; }
        public List<FilterGroupDto>? Groups { get; set; }
    }
}