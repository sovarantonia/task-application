using Castle.DynamicProxy;
using TaskApplication.entity;
using TaskApplication.entity.exceptions;
using TaskApplication.service;

namespace TaskApplication.filter_midw
{
    public class TaskInterceptor : IInterceptor
    {
        private CurrentUserFromCookie currentUser;
        private AuthorizedEmails allowedEmailList;

        public TaskInterceptor(CurrentUserFromCookie currentUser, AuthorizedEmails allowedEmailList)
        {
            this.currentUser = currentUser;
            this.allowedEmailList = allowedEmailList;
        }

        public void Intercept(IInvocation invocation)
        {
            var methodToCall = invocation.MethodInvocationTarget ?? invocation.Method;

            bool hasAttribute =
         Attribute.IsDefined(methodToCall, typeof(TaskAuthorizationAttribute), inherit: true) ||
    (methodToCall.DeclaringType != null &&
     Attribute.IsDefined(methodToCall.DeclaringType, typeof(TaskAuthorizationAttribute), inherit: true)); 

            if (hasAttribute && !allowedEmailList.AllowedEmails.Contains(currentUser.GetCurrentUserEmail()))
            {
                throw new UserNotAuthorizedException("User not authorized for this function");
            }

            invocation.Proceed();
        }
    }
}
