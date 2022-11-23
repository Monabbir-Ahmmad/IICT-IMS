using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Interfaces.Auth;
using Microsoft.IdentityModel.Tokens;

namespace API.Services.Auth
{
    public class TokenService : ITokenService
    {
        private readonly SymmetricSecurityKey _refreshTokenKey;
        private readonly SymmetricSecurityKey _accessTokenKey;

        public TokenService(IConfiguration config)
        {
            _accessTokenKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(config["Token:AccessKey"])
            );
            _refreshTokenKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(config["Token:RefreshKey"])
            );
        }

        public string CreateRefreshToken(int id, string role)
        {
            return GenerateToken(id, role, _refreshTokenKey, 43200);
        }

        public string CreateAccessToken(int id, string role)
        {
            return GenerateToken(id, role, _accessTokenKey, 15);
        }

        private string GenerateToken(
            int id,
            string role,
            SymmetricSecurityKey key,
            int expireMinutes
        )
        {
            var claims = new List<Claim>
            {
                new Claim("id", id.ToString()),
                new Claim(ClaimTypes.Role, role)
            };

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddMinutes(expireMinutes),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        public bool IsRefreshTokenExpired(string token)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtToken = tokenHandler.ReadJwtToken(token);

            return jwtToken.ValidTo < DateTime.Now;
        }

        public int GetUserIdFromToken(string token)
        {
            var jwtToken = new JwtSecurityTokenHandler().ReadJwtToken(token);

            return int.Parse(jwtToken.Claims.SingleOrDefault(claim => claim.Type == "id")?.Value);
        }

        public string GetRoleFromToken(string token)
        {
            var jwtToken = new JwtSecurityTokenHandler().ReadJwtToken(token);

            return jwtToken.Claims.SingleOrDefault(claim => claim.Type == "role")?.Value;
        }
    }
}
