using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.ComponentModel.DataAnnotations;
using TaskApplication.entity;

namespace TaskApplication.filter_midw
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, Inherited = true)]
    public class TaskAuthorizationAttribute : Attribute
    {
        public AuthorizedEmails AllowedEmailList { get; set; } = new();
    }
}
