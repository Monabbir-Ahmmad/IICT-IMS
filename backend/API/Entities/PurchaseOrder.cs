namespace API.Entities
{
    public class PurchaseOrder : BaseEntity
    {
        public int Id { get; set; }

        public ProductCategory Category { get; set; }

        public Procurement Procurement { get; set; }

        public Quotation Quotation { get; set; }

        public ICollection<Product> Products { get; set; }

        public decimal TotalPrice { get; set; }

        public DateTime DeliveryDeadline { get; set; }

        public DateTime? DeliveryDate { get; set; }

        public string Status { get; set; }
    }
}
