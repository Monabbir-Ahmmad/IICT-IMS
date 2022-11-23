using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Request
{
    public class DeliveryConfirmReqDto
    {
        [Required]
        public int PurchaseOrderId { get; set; }

        [Required]
        public IFormFile Voucher { get; set; }
    }
}
