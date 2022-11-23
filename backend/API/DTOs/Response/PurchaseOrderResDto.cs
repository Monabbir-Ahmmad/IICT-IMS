using API.Entities;

namespace API.DTOs.Response
{
    public class PurchaseOrderResDto
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Category { get; set; }

        public decimal TotalPrice { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime DeliveryDeadline { get; set; }

        public DateTime? DeliveryDate { get; set; }

        public string Status { get; set; }

        public bool IsApproved { get; set; }

        public SupplierResDto Supplier { get; set; }

        public UserResDto CreatedBy { get; set; }

        public Voucher Voucher { get; set; }

        public List<PurchaseOrderProductResDto> Products { get; set; }

        public ProcurementResDto Procurement { get; set; }

        public QuotationResDto Quotation { get; set; }
    }
}
