using System.Net;
using API.Errors;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Utilities
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
    public class AuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        private readonly IList<string> _roles;

        public AuthorizeAttribute(params string[] roles)
        {
            _roles = roles ?? new string[] { };
        }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            // skip authorization if action is decorated with [AllowAnonymous] attribute
            var allowAnonymous = context.ActionDescriptor.EndpointMetadata
                .OfType<AllowAnonymousAttribute>()
                .Any();
            if (allowAnonymous)
                return;

            // authorization
            var userId = (int)context.HttpContext.Items["userId"];
            var userRole = (string)context.HttpContext.Items["userRole"];

            if (userId <= 0 || (_roles.Any() && !_roles.Contains(userRole)))
            {
                // not logged in or role not authorized
                throw new ApiException(
                    HttpStatusCode.Forbidden,
                    "You are not authorized to perform this action."
                );
            }
        }
    }
}
