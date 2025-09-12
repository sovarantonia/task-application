namespace TaskApplication.entity
{
    public class CurrentUserFromCookie
    {
        private readonly IHttpContextAccessor httpContext;
        public CurrentUserFromCookie(IHttpContextAccessor accessor)
        {
            httpContext = accessor;
        }

        public string? GetCurrentUserEmail()
        {
            return httpContext.HttpContext.Request.Cookies["email"];
        }

    }
}
