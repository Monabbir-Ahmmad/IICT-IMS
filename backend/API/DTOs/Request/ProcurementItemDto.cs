using API.Entities;

namespace API.DTOs.Request
{
    public class ProcurementItemDto
    {
        public string Name { get; set; }

        public ProductCategory Category { get; set; }

        public string Manufacturer { get; set; }

        public string Details { get; set; }

        public float EstimatedPrice { get; set; }

        public int Quantity { get; set; }

        public float EstimatedTotalPrice { get; set; }
    }
}
