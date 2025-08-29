using Microsoft.VisualStudio.TestTools.UnitTesting;
using TaskApplication.service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json;

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
    ""itemsPerPage"": 5,
    ""sortCriteria"": [
    {
        ""property"": ""date"",
        ""direction"": 0
    },
    {
        ""property"": ""title"",
        ""direction"": 1
    }
    ],
    ""filterCriteria"": 
    [
        {""property"": ""statusId"", ""value"": ""2""}
    ]
}";
            var details = JsonSerializer.Deserialize<Dictionary<string, object>>(json);

            Dictionary<string, int> sortCriteria = new Dictionary<string, int>();
            sortCriteria.Add("date", 0);
            sortCriteria.Add("title", 1);
            Dictionary<string, string> filterCriteria = new Dictionary<string, string>();
            filterCriteria.Add("statusId", "2");

            PaginationDetails paginationDetails = new PaginationDetails();
            paginationDetails.ExtractPaginationDetails(details);
            
            Assert.AreEqual(1, paginationDetails.CurrentPageNo);
            Assert.AreEqual(5, paginationDetails.ItemsPerPage);
            Assert.IsTrue(sortCriteria.OrderBy(elem => elem.Key).SequenceEqual(paginationDetails.SortCriteria.OrderBy(elem => elem.Key)));
            Assert.IsTrue(filterCriteria.OrderBy(elem => elem.Key).SequenceEqual(paginationDetails.FilterCriteria.OrderBy(elem => elem.Key)));
        }
    }
}