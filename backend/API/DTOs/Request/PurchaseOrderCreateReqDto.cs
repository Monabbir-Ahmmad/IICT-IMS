using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Request
{
    public class PurchaseOrderCreateReqDto
    {
        [Required]
        public int ProcurementId { get; set; }

        [Required]
        public int QuotationId { get; set; }

        [Required]
        public DateTime DeliveryDeadline { get; set; }
    }
}
