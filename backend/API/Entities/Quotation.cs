using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Quotation : BaseEntity
    {
        public int Id { get; set; }

        [Required]
        public Procurement Procurement { get; set; }

        [Required]
        public Supplier Supplier { get; set; }

        [Required]
        public decimal QuotedTotalPrice { get; set; }

        public bool Accepted { get; set; }
    }
}
