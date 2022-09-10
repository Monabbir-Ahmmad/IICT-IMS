namespace API.DTOs.Request
{
    public class CreateQuotationDto
    {
        public int ProcurementId { get; set; }
        public int SupplierId { get; set; }
        public float QuotedTotalPrice { get; set; }
    }
}
