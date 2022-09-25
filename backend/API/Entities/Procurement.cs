using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Procurement : BaseEntity
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public ProductCategory Category { get; set; }

        [Required]
        public DateTime Deadline { get; set; }

        [Required]
        public decimal EstimatedTotalPrice { get; set; }

        public ICollection<ProcurementProduct> Products { get; set; }

        public ICollection<Quotation> Quotations { get; set; }
    }
}
