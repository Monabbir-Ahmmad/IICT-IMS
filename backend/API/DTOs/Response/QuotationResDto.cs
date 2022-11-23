namespace API.DTOs.Response
{
    public class QuotationResDto
    {
        public int Id { get; set; }

        public int ProcurementId { get; set; }

        public string ProcurementTitle { get; set; }

        public DateTime CreatedAt { get; set; }

        public decimal QuotedTotalPrice { get; set; }

        public SupplierResDto Supplier { get; set; }

        public bool Accepted { get; set; }
    }
}
