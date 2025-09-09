using Microsoft.AspNetCore.Mvc.Filters;
using System.Diagnostics;

namespace TaskApplication.filter_midw
{
    public class LogActionFilter : ActionFilterAttribute
    {
        private Stopwatch stopwatch;

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            stopwatch = Stopwatch.StartNew();
            Console.WriteLine("Started timer");
        }

        public override void OnActionExecuted(ActionExecutedContext context)
        {
            stopwatch.Stop();
            var elapsedMilliseconds = stopwatch.ElapsedMilliseconds;
            var message = $"Action took {elapsedMilliseconds} ms to execute.";
            Console.WriteLine(message);
        }
    }
}
