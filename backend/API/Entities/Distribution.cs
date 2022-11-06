namespace API.Entities
{
    public class Distribution : BaseEntity
    {
        public User Distributor { get; set; }
        public User DistributedTo { get; set; }
        public DateTime DistributionDate { get; set; }
        public string DistributionRoom { get; set; }
        public ICollection<InventoryProduct> Products { get; set; }
    }
}
