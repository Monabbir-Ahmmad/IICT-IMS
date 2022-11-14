using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Request
{
    public class UserProfileUpdateReqDto
    {
        public int Id { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        [Required]
        public string ContactNumber { get; set; }

        [Required]
        public string Designation { get; set; }
    }
}
