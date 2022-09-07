namespace API.Entities
{
    public class ProcurementItem
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public ProductCategory Category { get; set; }

        public string Manufacturer { get; set; }

        public string Details { get; set; }

        public float EstimatedPrice { get; set; }

        public int Quantity { get; set; }

        public float EstimatedTotalPrice { get; set; }
    }
}
