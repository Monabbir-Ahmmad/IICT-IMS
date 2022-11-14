namespace API.DTOs.Response
{
    public class PendingCountsResDto
    {
        public int PendingUsers { get; set; }
        public int PendingSuppliers { get; set; }
        public int PendingProcurements { get; set; }
        public int PendingPurchaseOrders { get; set; }
    }
}
