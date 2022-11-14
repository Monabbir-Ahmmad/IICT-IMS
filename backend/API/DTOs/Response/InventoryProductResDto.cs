namespace API.DTOs.Response
{
    public class InventoryProductResDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Category { get; set; }

        public string Manufacturer { get; set; }

        public string Details { get; set; }

        public decimal Price { get; set; }

        public DateTime? WarrantyExpiryDate { get; set; }

        public string Status { get; set; }

        public DistributionResDto CurrentDistribution { get; set; }
    }
}
