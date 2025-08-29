namespace TaskApplicationTests.repository
{
    [TestClass]
    public class RepositoryTests
    {
        [TestMethod]
        public void RepositoryTest()
        {
            //Assert.Fail();
            var a = 2;
            var b = 3;

            var res = a + b;
            Assert.AreEqual(5, res);
        }
    }
}