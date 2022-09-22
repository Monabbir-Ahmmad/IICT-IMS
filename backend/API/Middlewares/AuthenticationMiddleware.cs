using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Threading.Tasks;
using API.Database;
using API.Interfaces.Auth;

namespace API.Middlewares
{
    public class AuthenticationMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly DatabaseContext _context;

        public AuthenticationMiddleware(RequestDelegate next, DatabaseContext context)
        {
            _next = next;
            _context = context;
        }

        public async Task Invoke(HttpContext httpContext, IAuthService authService)
        {
            var request = httpContext.Request;
            if (request.Path.HasValue && request.Path.Value.ToLower() is "/api/auth/login" or "/api/auth/register")
            {
                await _next.Invoke(httpContext);
                return;
            }

            var userId = DecodeAccessToken(httpContext);


            if (user == null)
            {
                httpContext.Response.StatusCode = 401;
                await httpContext.Response.WriteAsync("Unauthorized");
                return;
            }

            httpContext.Items["User"] = userId;
            await _next.Invoke(httpContext);
        }
        private static string? DecodeAccessToken(HttpContext httpContext)
        {
            try
            {
                var token = httpContext.Request.Cookies["authorization"];
                if (token == null) { return null; }

                token = token.Split(" ").Last();
                var handler = new JwtSecurityTokenHandler();
                var jwtSecurityToken = handler.ReadJwtToken(token);

                var userId = jwtSecurityToken.Claims.First(claim => claim.Type == "").Value;

                return userId;
            }
            catch
            {
                return null;
            }
        }
    }
}