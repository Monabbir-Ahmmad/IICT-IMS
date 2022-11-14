using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Request
{
    public class LoginReqDto
    {
        [Required, EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }
}
