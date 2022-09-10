namespace API.DTOs.Response
{
    public class ProcurementResDto
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public string Category { get; set; }

        public float EstimatedTotalPrice { get; set; }

        public DateTime IssuingDate { get; set; }

        public DateTime TenderDeadline { get; set; }

        public List<ProcurementProductResponseDto> Products { get; set; }
        public List<QuotationResDto> Quotations { get; set; }
    }

    public class ProcurementProductResponseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public string Manufacturer { get; set; }
        public string Details { get; set; }
        public float EstimatedPrice { get; set; }
        public int Quantity { get; set; }
        public float EstimatedTotalPrice { get; set; }
    }
}
