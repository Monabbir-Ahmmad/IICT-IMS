namespace API.Entities
{
    public class Quotation
    {
        public int Id { get; set; }
        public Procurement Procurement { get; set; }
        public SupplierDetails Supplier { get; set; }
        public float QuotedTotalPrice { get; set; }
    }
}
