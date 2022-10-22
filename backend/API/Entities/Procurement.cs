namespace API.Entities
{
    public class Procurement : BaseEntity
    {
        public string Title { get; set; }

        public ProductCategory Category { get; set; }

        public DateTime Deadline { get; set; }

        public decimal EstimatedTotalPrice { get; set; }

        public string Status { get; set; }

        public ICollection<ProcurementProduct> Products { get; set; }

        public ICollection<Quotation> Quotations { get; set; }
    }
}
