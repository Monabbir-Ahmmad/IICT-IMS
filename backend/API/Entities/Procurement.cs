namespace API.Entities
{
    public class Procurement
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public ProductCategory Category { get; set; }
        
        public DateTime IssuingDate { get; set; }

        public DateTime TenderDeadline { get; set; }

        public float EstimatedTotalCost { get; set; }
    }
}
