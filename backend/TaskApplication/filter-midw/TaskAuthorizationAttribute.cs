using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using System.ComponentModel.DataAnnotations;

namespace TaskApplication.filter_midw
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class TaskAuthorizationAttribute : Attribute
    {
        public string[] AdminEmailList { get; }
        public TaskAuthorizationAttribute()
        {
            AdminEmailList = ["admin@admin.com"];
        }
    }
}
