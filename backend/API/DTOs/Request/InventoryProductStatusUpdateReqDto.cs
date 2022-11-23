using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Request
{
    public class InventoryProductStatusUpdateReqDto
    {
        public int UserId { get; set; }

        [Required]
        public int ProductId { get; set; }

        [Required]
        public string Status { get; set; }
    }
}
