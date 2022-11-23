namespace API.Entities
{
    public class Quotation : BaseEntity
    {
        public Procurement Procurement { get; set; }

        public Supplier Supplier { get; set; }

        public decimal QuotedTotalPrice { get; set; }

        public bool Accepted { get; set; }
    }
}
