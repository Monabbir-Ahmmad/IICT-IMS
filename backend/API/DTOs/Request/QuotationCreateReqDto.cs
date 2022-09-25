using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Request
{
    public class QuotationCreateReqDto
    {
        [Required]
        public int ProcurementId { get; set; }

        [Required]
        public int SupplierId { get; set; }

        [Required]
        public decimal QuotedTotalPrice { get; set; }
    }
}
