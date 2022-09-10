namespace API.Entities
{
    public class Quotation
    {
        public int Id { get; set; }
        public Procurement Procurement { get; set; }
        public Supplier Supplier { get; set; }
        public float QuotedTotalPrice { get; set; }
    }
}
