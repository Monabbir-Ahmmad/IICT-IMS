namespace API.Entities
{
    public class PurchaseOrder
    {
        public int Id { get; set; }

        public Procurement Procurement { get; set; }

        public Quotation Quotation { get; set; }

        public DateTime DeliveryDeadline { get; set; }

        public string Status { get; set; }
    }
}
