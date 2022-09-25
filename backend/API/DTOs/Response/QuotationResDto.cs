namespace API.DTOs.Response
{
    public class QuotationResDto
    {
        public int Id { get; set; }

        public int ProcurementId { get; set; }

        public string ProcurementName { get; set; }

        public DateTime CreatedAt { get; set; }

        public decimal QuotedTotalPrice { get; set; }

        public SupplierDetailsResDto Supplier { get; set; }

        public bool Accepted { get; set; }
    }
}
