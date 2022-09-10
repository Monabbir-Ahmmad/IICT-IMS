using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Request
{
    public class ProcurementDto
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public int ProcurementCategoryId { get; set; }

        [Required]
        public float EstimatedTotalPrice { get; set; }

        [Required]
        public DateTime TenderDeadline { get; set; }

        [Required]
        public List<ProcurementProductDto> Products { get; set; }
    }
}
