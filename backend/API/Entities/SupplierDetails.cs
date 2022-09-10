namespace API.Entities
{
    public class SupplierDetails
    {
        public int Id { get; set; }
        public int BIN { get; set; }
        public string CompanyName { get; set; }
        public string Address { get; set; }
        public ProductCategory Category { get; set; }
        public string ContactNumber { get; set; }
        public string Email { get; set; }
        public string Website { get; set; }
        public ICollection<Quotation> Quotations { get; set; }
    }
}
