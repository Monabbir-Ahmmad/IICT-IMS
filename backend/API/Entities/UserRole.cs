using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class UserRole
    {
        public int Id { get; set; }

        [Required]
        public string RoleName { get; set; }
    }
}
