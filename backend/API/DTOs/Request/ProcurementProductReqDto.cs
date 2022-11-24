using System.ComponentModel.DataAnnotations;
using API.Entities;

namespace API.DTOs.Request
{
    public class ProcurementProductReqDto
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Manufacturer { get; set; }

        [Required]
        public string Details { get; set; }

        [Required, Range(1, 300000)]
        public decimal EstimatedPrice { get; set; }

        [Required, Range(1, 1000)]
        public int Quantity { get; set; }
    }
}
