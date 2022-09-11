namespace API.DTOs.Request
{
    public class QuotationCreateReqDto
    {
        public int ProcurementId { get; set; }
        public int SupplierId { get; set; }
        public float QuotedTotalPrice { get; set; }
    }
}
