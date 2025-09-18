using Castle.DynamicProxy;
using System.Reflection;

namespace TaskApplication.filter_midw
{
    public class ValidateAttributeHook : IProxyGenerationHook
    {
        private List<Type> attributeTypes = new List<Type> { typeof(TaskAuthorizationAttribute) };

        //public ValidateAttributeHook(List<Type> types)
        //{
        //    attributeTypes = types;
        //}
        public void MethodsInspected()
        {
        }

        public void NonProxyableMemberNotification(Type type, MemberInfo memberInfo)
        {
        }

        public bool ShouldInterceptMethod(Type type, MethodInfo methodInfo)
        {
            return methodInfo.GetCustomAttributes().Any(a => attributeTypes.Contains(a.GetType()));
        }
    }
}
