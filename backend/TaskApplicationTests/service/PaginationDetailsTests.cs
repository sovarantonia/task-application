using System.Text.Json;
using TaskApplication.entity;
using TaskApplication.entity.dto;

namespace TaskApplication.service.Tests
{
    [TestClass()]
    public class PaginationDetailsTests
    {
        [TestMethod()]
        public void ExtractPaginationDetailsTest()
        {
            string json = @"{
    ""currentPageNo"": 1,
    ""itemsPerPage"": 10,
    ""sortCriteria"": [
        {
            ""property"": ""creationDate"",
            ""direction"": -1
        }
    ],
    ""filterGroup"": [
    {
      ""logicOperator"": ""And"",
      ""filterCriteria"": [
        {
          ""property"": ""userId"",
          ""values"": [""X""],
          ""filterOption"": { ""operator"": ""Equal"", ""isNegated"": false }
        }
      ],
      ""groups"": [
        {
          ""logicOperator"": ""Or"",
          ""filterCriteria"": [
            {
              ""property"": ""statusId"",
              ""values"": [1, 2],
              ""filterOption"": { ""operator"": ""Equal"", ""isNegated"": false }
            }
          ]
        }
      ]
    }
  ]
}";
            var details = JsonSerializer.Deserialize<Dictionary<string, object>>(json);
            PaginationDetails paginationDetails = new PaginationDetails();

            Dictionary<string, int> sortCriteria = new Dictionary<string, int>();
            sortCriteria.Add("creationDate", -1);        
            
            paginationDetails.ExtractPaginationDetails(details);

            Assert.AreEqual(1, paginationDetails.CurrentPageNo);
            Assert.AreEqual(10, paginationDetails.ItemsPerPage);

            Assert.IsTrue(sortCriteria.OrderBy(elem => elem.Key).SequenceEqual(paginationDetails.SortCriteria.OrderBy(elem => elem.Key)));

            
            Assert.AreEqual(1, paginationDetails.FilterGroup.Count);
            Assert.AreEqual(LogicOperator.And, paginationDetails.FilterGroup[0].LogicOperator);
            
            var filterCriteria1 = paginationDetails.FilterGroup[0].FilterCriteria[0];
            Assert.AreEqual("userId", filterCriteria1.Property);
            Assert.AreEqual("X", filterCriteria1.Values[0].ToString());
            Assert.AreEqual(Operator.Equal, filterCriteria1.FilterOption.Operator);
            Assert.IsFalse(filterCriteria1.FilterOption.IsNegated);

            var nested = paginationDetails.FilterGroup[0].Groups[0];
            Assert.AreEqual(LogicOperator.Or, nested.LogicOperator);

            var nestedCriteria = nested.FilterCriteria[0];
            Assert.AreEqual("statusId", nestedCriteria.Property);
            
            Assert.AreEqual("1", nestedCriteria.Values[0].ToString());
            Assert.AreEqual("2", nestedCriteria.Values[1].ToString());
            Assert.IsNotNull(nestedCriteria.FilterOption);
            Assert.AreEqual(Operator.Equal, nestedCriteria.FilterOption.Operator);
            Assert.IsFalse(nestedCriteria.FilterOption.IsNegated);
        }
    }
}