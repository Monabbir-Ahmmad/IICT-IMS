using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using API.Database;
using API.Interfaces.Auth;
using Microsoft.EntityFrameworkCore;

namespace API.Middlewares
{
    public class AuthenticationMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly DatabaseContext _dbContext;

        public AuthenticationMiddleware(RequestDelegate next, DatabaseContext dbContext)
        {
            _next = next;
            _dbContext = dbContext;
        }

        public async Task Invoke(HttpContext httpContext, IAuthService authService, ITokenService tokenService)
        {
            var request = httpContext.Request;
            if (request.Path.HasValue && request.Path.Value.ToLower() is "/api/auth/login" or "/api/auth/register")
            {
                await _next.Invoke(httpContext);
                return;
            }

            var userId = tokenService.DecodeToken(httpContext);
            var user = _dbContext.Users.Where(x => x.Id.ToString() == userId).FirstOrDefaultAsync();

            if (user == null)
            {
                httpContext.Response.StatusCode = 401;
                await httpContext.Response.WriteAsync("Unauthorized");
                return;
            }

            httpContext.Items["User"] = userId;
            await _next.Invoke(httpContext);
        }
    }
}