using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Request
{
    public class RegisterReqDto
    {
        [Required]
        public string Username { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        [Required]
        public int UserRoleId { get; set; }

        [
            Required,
            RegularExpression(
                @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8}$",
                ErrorMessage = "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character."
            )
        ]
        public string Password { get; set; }
    }
}
