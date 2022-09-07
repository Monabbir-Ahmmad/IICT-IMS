using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Request
{
    public class ProcuremnetDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Category { get; set; }
        [Required]
        public float EstimatedTotalPrice { get; set; }
        [Required]
        public DateTime IssuingDate { get; set; }
        [Required]
        public DateTime TenderDeadline { get; set; }
    }
}
