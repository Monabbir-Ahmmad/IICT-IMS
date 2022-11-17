using API.Database;
using API.Enums;
using API.Errors;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Middlewares
{
    public class AuthMiddleware
    {
        private readonly RequestDelegate _next;

        public AuthMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(
            HttpContext httpContext,
            DatabaseContext context,
            ITokenService tokenService
        )
        {
            if (
                httpContext.Request.Path.Value.ToLower().Contains("/auth")
                || httpContext.Request.Path.Value.ToLower().Contains("/swagger")
                || httpContext.Request.Path.Value.ToLower().Contains("/public")
            )
            {
                await _next(httpContext);
                return;
            }

            var token =
                httpContext.Request.Cookies["authorization"]?.Split(" ").Last()
                ?? httpContext.Request.Headers["authorization"].ToString().Split(" ").Last();

            if (string.IsNullOrEmpty(token))
            {
                throw new UnauthorizedException("No Token Found.");
            }

            var userId = tokenService.ValidateToken(token);
            if (userId == null)
                throw new UnauthorizedException("Invalid Token.");

            var userRole = tokenService.GetRoleFromToken(token);

            if (userRole == UserRoleEnum.Supplier)
            {
                var supplier = await context.Suppliers.FirstOrDefaultAsync(x => x.Id == userId);

                if (supplier == null)
                    throw new UnauthorizedException("Invalid Token.");
                if (!supplier.IsVerified)
                    throw new UnauthorizedException("Account is not verified.");
            }
            else
            {
                var user = await context.Users
                    .Include(x => x.Role)
                    .FirstOrDefaultAsync(x => x.Id == userId);

                if (user == null)
                    throw new UnauthorizedException("Invalid Token.");
                if (!user.IsVerified)
                    throw new UnauthorizedException("Account is not verified.");

                userRole = user.Role.Name;
            }

            httpContext.Items["userId"] = userId;
            httpContext.Items["userRole"] = userRole;
            await _next.Invoke(httpContext);
        }
    }
}
