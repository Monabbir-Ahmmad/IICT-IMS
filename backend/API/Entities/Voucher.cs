namespace API.Entities
{
    public class Voucher : BaseEntity
    {
        public string FileName { get; set; }

        public ICollection<InventoryProduct> InventoryProducts { get; set; }
    }
}
