using API.Entities;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Request
{
    public class ProcuremnetDto
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public int ProcuremnetCategoryId { get; set; }

        [Required]
        public float EstimatedTotalPrice { get; set; }

        [Required]
        public DateTime TenderDeadline { get; set; }

        [Required]
        public List<ProcurementProductDto> Products { get; set; }
    }
}
