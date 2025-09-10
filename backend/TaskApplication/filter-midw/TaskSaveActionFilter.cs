using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;


namespace TaskApplication.filter_midw
{
    public class TaskSaveActionFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var cookie = context.HttpContext.Request.Cookies["email"];
            if (cookie == null)
            {
                context.Result = new UnauthorizedResult();
                return;
            }
            Console.WriteLine($"Save Task Request {context.HttpContext.Request.Path}");
        }

        public override void OnActionExecuted(ActionExecutedContext context)
        {
            Console.WriteLine($"Save Task response {context.HttpContext.Response.StatusCode}");
        }
    }
}
