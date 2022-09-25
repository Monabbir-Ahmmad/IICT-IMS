using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Request
{
    public class ProductDeliveryReqDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Manufacturer { get; set; }

        [Required]
        public string Details { get; set; }

        [Required]
        public decimal UnitPrice { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        public DateTime WarrantyExpiryDate { get; set; }
    }
}
