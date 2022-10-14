namespace API.Entities
{
    public class PurchaseOrder : BaseEntity
    {
        public ProductCategory Category { get; set; }

        public Procurement Procurement { get; set; }

        public Quotation Quotation { get; set; }

        public ICollection<PurchaseOrderProduct> Products { get; set; }

        public decimal TotalPrice { get; set; }

        public DateTime DeliveryDeadline { get; set; }

        public DateTime? DeliveryDate { get; set; }

        public string Status { get; set; }
    }
}
