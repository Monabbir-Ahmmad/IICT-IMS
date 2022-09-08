using API.Entities;

namespace API.DTOs.Response
{
    public class AuthResponseDto
    {
        public User User { get; set; }
        public string Token { get; set; }
    }
}
