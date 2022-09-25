using System.ComponentModel.DataAnnotations;
using API.Entities;

namespace API.DTOs.Request
{
    public class ProcurementProductReqDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Manufacturer { get; set; }

        [Required]
        public string Details { get; set; }

        [Required]
        public decimal EstimatedPrice { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        public decimal EstimatedTotalPrice { get; set; }
    }
}
