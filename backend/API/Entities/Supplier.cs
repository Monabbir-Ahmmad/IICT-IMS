using System.ComponentModel.DataAnnotations;

namespace API.Entities
{
    public class Supplier
    {
        public int Id { get; set; }

        [Required]
        public string CompanyName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string BIN { get; set; }

        [Required]
        public ProductCategory Category { get; set; }

        public string Address { get; set; }

        public string ContactNumber { get; set; }

        public string Website { get; set; }

        public ICollection<Quotation> Quotations { get; set; }
    }
}
