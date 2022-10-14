namespace API.DTOs.Response
{
    public class PurchaseOrderProductResDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Category { get; set; }

        public string Manufacturer { get; set; }

        public string Details { get; set; }

        public decimal UnitPrice { get; set; }

        public int Quantity { get; set; }

        public DateTime WarrantyExpiryDate { get; set; }
    }
}
