using System.ComponentModel.DataAnnotations;
using API.Entities;

namespace API.DTOs.Request
{
    public class ProcurementProductDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public string Manufacturer { get; set; }

        [Required]
        public string Details { get; set; }

        [Required]
        public float EstimatedPrice { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        public float EstimatedTotalPrice { get; set; }
    }
}
