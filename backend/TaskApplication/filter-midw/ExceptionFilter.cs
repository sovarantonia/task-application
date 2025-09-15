using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using TaskApplication.entity;

namespace TaskApplication.filter_midw
{
    public class ExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            var exception = context.Exception;
            var status = exception is UserNotAuthorizedException
                ? StatusCodes.Status401Unauthorized
                : StatusCodes.Status400BadRequest;


            var error = new ErrorModel(status, exception.Message);
           
            context.Result = new ObjectResult(error) { StatusCode = status };

            context.ExceptionHandled = true;
        }
    }
}
