using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Request
{
    public class ProductDeliveryReqDto
    {
        [Required]
        public int Id { get; set; }

        [Required]
        public decimal UnitPrice { get; set; }

        public DateTime? WarrantyExpiryDate { get; set; }
    }
}
