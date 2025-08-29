using Microsoft.VisualStudio.TestTools.UnitTesting;
using TaskApplication.service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskApplication.repository;
using Moq;


namespace TaskApplication.service.Tests
{
    [TestClass()]
    public class UserServiceTests
    {
        public Mock UserRepository = new Mock<UserRepository>();

        //[TestMethod()]
        //public void ValidateUserTest()
        //{
        //    Assert.Fail();
        //}

        [TestMethod()]
        public void SaveUserTest()
        {
           
            //Assert.Fail();
        }

        //[TestMethod()]
        //public void FindUserByIdTest()
        //{
        //    Assert.Fail();
        //}

        //[TestMethod()]
        //public void DeleteUserTest()
        //{
        //    Assert.Fail();
        //}

        //[TestMethod()]
        //public void UpdateUserTest()
        //{
        //    Assert.Fail();
        //}

        //[TestMethod()]
        //public void GetPaginatedUsersTest()
        //{
        //    Assert.Fail();
        //}

        //[TestMethod()]
        //public void GetTotalUsersNoTest()
        //{
        //    Assert.Fail();
        //}

        //[TestMethod()]
        //public void GetAllUsersTest()
        //{
        //    Assert.Fail();
        //}
    }
}