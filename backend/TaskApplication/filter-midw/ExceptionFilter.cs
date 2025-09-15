using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using TaskApplication.entity;
using TaskApplication.entity.exceptions;

namespace TaskApplication.filter_midw
{
    public class ExceptionFilter : IExceptionFilter
    {
        public void OnException(ExceptionContext context)
        {
            var exception = context.Exception;
            int status;

            switch (exception)
            {
                case (UserNotAuthorizedException):
                    status = StatusCodes.Status401Unauthorized;
                    break;
                case (EntityNotFoundException):
                    status = StatusCodes.Status404NotFound;
                    break;
                default:
                    status = StatusCodes.Status400BadRequest;
                    break;

            }

            var error = new ErrorModel(status, exception.Message);

            context.Result = new ObjectResult(error) { StatusCode = status };

            context.ExceptionHandled = true;
        }
    }
}
