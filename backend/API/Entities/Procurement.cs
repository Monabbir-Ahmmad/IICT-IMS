namespace API.Entities
{
    public class Procurement
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public ProductCategory Category { get; set; }

        public DateTime IssuingDate { get; set; }

        public DateTime Deadline { get; set; }

        public List<ProcurementProduct> Products { get; set; }

        public float EstimatedTotalPrice { get; set; }
    }
}
