namespace API.Entities
{
    public class Supplier : AccountBaseEntity
    {
        public string CompanyName { get; set; }

        public string BIN { get; set; }

        public Category Category { get; set; }

        public string Address { get; set; }

        public string ContactNumber { get; set; }

        public string Website { get; set; }

        public ICollection<Quotation> Quotations { get; set; }
    }
}
