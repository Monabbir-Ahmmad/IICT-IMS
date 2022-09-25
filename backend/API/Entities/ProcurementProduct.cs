using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class ProcurementProduct
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public ProductCategory Category { get; set; }

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

        [Required]
        public Procurement Procurement { get; set; }
    }
}
