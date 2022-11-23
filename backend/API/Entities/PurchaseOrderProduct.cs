namespace API.Entities
{
    public class PurchaseOrderProduct : BaseEntity
    {
        public PurchaseOrder PurchaseOrder { get; set; }

        public Product Product { get; set; }

        public int Quantity { get; set; }

        public decimal? UnitPrice { get; set; }

        public DateTime? WarrantyExpiryDate { get; set; }
    }
}
