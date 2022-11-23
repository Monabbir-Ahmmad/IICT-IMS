namespace API.Entities
{
    public class PurchaseOrder : BaseEntity
    {
        public User CreatedBy { get; set; }

        public string Title { get; set; }

        public Category Category { get; set; }

        public Voucher Voucher { get; set; }

        public DateTime DeliveryDeadline { get; set; }

        public DateTime? DeliveryDate { get; set; }

        public DateTime? ReceiveDate { get; set; }

        public decimal TotalPrice { get; set; }

        public string Status { get; set; }

        public bool IsApproved { get; set; }

        public Supplier Supplier { get; set; }

        public ICollection<PurchaseOrderProduct> Products { get; set; }

        public Procurement Procurement { get; set; }

        public Quotation Quotation { get; set; }
    }
}
