using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Interfaces.Auth;
using Microsoft.IdentityModel.Tokens;

namespace API.Services.Auth
{
    public class TokenService : ITokenService
    {
        private readonly SymmetricSecurityKey _key;

        public TokenService(IConfiguration config)
        {
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Token:Key"]));
        }

        public string CreateToken(int Id, string Email, string role)
        {
            var claims = new List<Claim>
            {
                new Claim("id", Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, Email),
                new Claim(ClaimTypes.Role, role)
            };

            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public string? DecodeToken(HttpContext httpContext)
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
