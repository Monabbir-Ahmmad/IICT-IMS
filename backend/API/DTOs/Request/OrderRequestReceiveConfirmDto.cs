using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Request
{
    public class OrderRequestReceiveConfirmDto
    {
        [Required]
        public int PurchaseOrderId { get; set; }

        [Required]
        public DateTime DeliveryDate { get; set; }

        [Required]
        public List<ProductDeliveryReqDto> Products { get; set; }
    }
}
