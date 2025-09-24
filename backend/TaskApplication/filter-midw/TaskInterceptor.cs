using Castle.DynamicProxy;
using TaskApplication.entity;
using TaskApplication.entity.exceptions;

namespace TaskApplication.filter_midw
{
    public class TaskInterceptor : IInterceptor
    {
        private ICurrentUser currentUser;
        private AuthorizedEmails allowedEmailList;

        public TaskInterceptor(ICurrentUser currentUser, AuthorizedEmails allowedEmailList)
        {
            this.currentUser = currentUser;
            this.allowedEmailList = allowedEmailList;
        }
        public void Intercept(IInvocation invocation)
        {
            if (!allowedEmailList.AllowedEmails.Contains(currentUser.GetCurrentUserEmail()))
            {
                throw new UserNotAuthorizedException("User not authorized for this function");
            }

            invocation.Proceed();
        }
    }
}
