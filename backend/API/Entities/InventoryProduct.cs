namespace API.Entities
{
    public class InventoryProduct : BaseEntity
    {
        public Product Product { get; set; }

        public decimal Price { get; set; }

        public DateTime? WarrantyExpiryDate { get; set; }

        public string Status { get; set; }

        public DirectPurchase DirectPurchase { get; set; }

        public PurchaseOrder PurchaseOrder { get; set; }

        public Distribution? CurrentDistribution { get; set; }

        public ICollection<Distribution> DistributionHistory { get; set; }

        public ICollection<ReceiveReturn> ReceiveReturnHistory { get; set; }
    }
}
