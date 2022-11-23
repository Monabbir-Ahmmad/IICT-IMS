using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Interfaces;
using Microsoft.IdentityModel.Tokens;

namespace API.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;

        public TokenService(IConfiguration config)
        {
            _config = config;
        }

        public string CreateRefreshToken(int id, string role)
        {
            var key = _config["Token:RefreshKey"];
            var expireMinutes = int.Parse(_config["Token:RefreshKeyExpireMinutes"]);
            return GenerateToken(id, role, key, expireMinutes);
        }

        public string CreateAccessToken(int id, string role)
        {
            var key = _config["Token:AccessKey"];
            var expireMinutes = int.Parse(_config["Token:AccessKeyExpireMinutes"]);
            return GenerateToken(id, role, key, expireMinutes);
        }

        private string GenerateToken(int id, string role, string key, int expireMinutes)
        {
            var claims = new List<Claim>
            {
                new Claim("id", id.ToString()),
                new Claim(ClaimTypes.Role, role)
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddMinutes(expireMinutes),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key)),
                    SecurityAlgorithms.HmacSha512Signature
                )
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public int? ValidateToken(string token, bool isRefreshToken = false)
        {
            if (token == null)
                return null;

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(
                isRefreshToken ? _config["Token:RefreshKey"] : _config["Token:AccessKey"]
            );
            try
            {
                tokenHandler.ValidateToken(
                    token,
                    new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(key),
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ClockSkew = TimeSpan.Zero
                    },
                    out SecurityToken validatedToken
                );

                var jwtToken = (JwtSecurityToken)validatedToken;

                var userId = int.Parse(jwtToken.Claims.First(x => x.Type == "id").Value);

                return userId;
            }
            catch
            {
                return null;
            }
        }

        public string GetRoleFromToken(string token)
        {
            var jwtToken = new JwtSecurityTokenHandler().ReadJwtToken(token);

            return jwtToken.Claims.SingleOrDefault(claim => claim.Type == "role")?.Value;
        }
    }
}
