using API.Entities;

namespace API.DTOs.Response
{
    public class AuthResDto
    {
        public string RefreshToken { get; set; }
        public string AccessToken { get; set; }
    }
}
