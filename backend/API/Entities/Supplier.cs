namespace API.Entities
{
    public class Supplier
    {
        public int Id { get; set; }
        public string CompanyName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string BIN { get; set; }
        public ProductCategory Category { get; set; }
        public string Address { get; set; }
        public string ContactNumber { get; set; }
        public string Website { get; set; }

        public ICollection<Quotation> Quotations { get; set; }
    }
}
