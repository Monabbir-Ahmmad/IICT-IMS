using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Request
{
    public class PasswordUpdateReqDto
    {
        public int Id { get; set; }

        [Required]
        public string CurrentPassword { get; set; }

        [
            Required,
            RegularExpression(
                @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8}$",
                ErrorMessage = "New password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character."
            )
        ]
        public string NewPassword { get; set; }
    }
}
