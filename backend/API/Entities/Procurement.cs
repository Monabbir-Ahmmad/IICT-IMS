namespace API.Entities
{
    public class Procurement : BaseEntity
    {
        public User CreatedBy { get; set; }

        public string Title { get; set; }

        public Category Category { get; set; }

        public DateTime Deadline { get; set; }

        public decimal EstimatedTotalPrice { get; set; }

        public string Status { get; set; }

        public bool IsApproved { get; set; }

        public ICollection<ProcurementProduct> Products { get; set; }

        public ICollection<Quotation> Quotations { get; set; }
    }
}
