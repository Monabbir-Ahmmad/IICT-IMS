using API.Entities;

namespace API.DTOs.Response
{
    public class DirectPurchaseResDto
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Category { get; set; }

        public decimal TotalPrice { get; set; }

        public DateTime? PurchaseDate { get; set; }

        public Voucher Voucher { get; set; }

        public string SupplierName { get; set; }

        public string SupplierAddress { get; set; }

        public string SupplierContact { get; set; }

        public List<InventoryProductResDto> Products { get; set; }
    }
}
