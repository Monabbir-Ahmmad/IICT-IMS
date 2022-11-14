

namespace API.Entities
{
    public class ReceiveReturn : BaseEntity
    {
        public User Receiver { get; set; }
        public User ReceivedFrom { get; set; }
        public DateTime ReceivingDate { get; set; }
        public ICollection<InventoryProduct> Products { get; set; }
    }
}