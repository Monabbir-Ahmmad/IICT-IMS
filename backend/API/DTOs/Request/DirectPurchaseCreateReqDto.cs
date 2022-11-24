using System.ComponentModel.DataAnnotations;

namespace API.DTOs.Request
{
    public class DirectPurchaseCreateReqDto
    {
        [Required]
        public string Title { get; set; }

        [Required]
        public int CategoryId { get; set; }

        [Required]
        public IFormFile Voucher { get; set; }

        [Required]
        public DateTime PurchaseDate { get; set; }

        [Required]
        public string SupplierName { get; set; }

        [Required]
        public string SupplierContact { get; set; }

        [Required]
        public string SupplierAddress { get; set; }

        [Required]
        public ICollection<DirectPurchaseProductReqDto> Products { get; set; }
    }

    public class DirectPurchaseProductReqDto
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Manufacturer { get; set; }

        [Required]
        public string Details { get; set; }

        public DateTime? WarrantyExpiryDate { get; set; }

        [Required, Range(1, 25000)]
        public decimal UnitPrice { get; set; }

        [Required, Range(1, 1000)]
        public int Quantity { get; set; }
    }
}
