using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Enums
{
    public class StatusEnum
    {
        public static readonly string PendingApproval = "Pending Approval";
        public static readonly string Pending = "Pending";
        public static readonly string NoOffer = "No Offer";
        public static readonly string OfferAvailable = "Offer Available";
        public static readonly string OfferAccepted = "Offer Accepted";
        public static readonly string OrderAccepted = "Order Accepted";
        public static readonly string DeliveryCompleted = "Delivery Completed";
        public static readonly string InInventory = "In Inventory";
        public static readonly string Distributed = "Distributed";
        public static readonly string TemporarilyDamaged = "Temporarily Damaged";
        public static readonly string PermanentlyDamaged = "Permanently Damaged";

        public static readonly string[] UpdatableStatuse = new string[]
        {
            InInventory,
            TemporarilyDamaged,
            PermanentlyDamaged
        };
    }
}
