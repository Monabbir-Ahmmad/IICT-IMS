using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Request
{
    public class ProcurementReqDto
    {
        public int CreatedById { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public int ProcurementCategoryId { get; set; }

        [Required]
        public DateTime Deadline { get; set; }

        [Required]
        public List<ProcurementProductReqDto> Products { get; set; }
    }
}
