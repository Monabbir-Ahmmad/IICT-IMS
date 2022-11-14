using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Request
{
    public class QuotationCreateReqDto
    {
        [Required]
        public int ProcurementId { get; set; }

        [Required]
        public int SupplierId { get; set; }

        [
            Required,
            Range(1, 300000, ErrorMessage = "Quoted total price must be between 1 and 300000.")
        ]
        public decimal QuotedTotalPrice { get; set; }
    }
}
