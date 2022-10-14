namespace API.Entities
{
    public class ProcurementProduct : BaseEntity
    {
        public Product Product { get; set; }

        public decimal EstimatedPrice { get; set; }

        public int Quantity { get; set; }

        public Procurement Procurement { get; set; }
    }
}
