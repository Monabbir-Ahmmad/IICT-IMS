namespace API.Entities
{
    public class DirectPurchase : BaseEntity
    {
        public string Title { get; set; }

        public Category Category { get; set; }

        public Voucher Voucher { get; set; }

        public DateTime PurchaseDate { get; set; }

        public decimal TotalPrice { get; set; }

        public string SupplierName { get; set; }

        public string SupplierContact { get; set; }

        public string SupplierAddress { get; set; }

        public ICollection<InventoryProduct> Products { get; set; }
    }
}
