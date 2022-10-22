using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Enums
{
    public class StatusEnum
    {
        public static readonly string Pending = "Pending";
        public static readonly string Approved = "Approved";
        public static readonly string Rejected = "Rejected";
        public static readonly string Cancelled = "Cancelled";
        public static readonly string Completed = "Completed";
        public static readonly string NoOffer = "No Offer";
        public static readonly string OfferAvailable = "Offer Available";
        public static readonly string OfferAccepted = "Offer Accepted";
        public static readonly string Deleted = "Deleted";
        public static readonly string Expired = "Expired";
        public static readonly string Unverified = "Unverified";
        public static readonly string Verified = "Verified";
        public static readonly string DeliveryNotSent = "Delivery Not Sent";
        public static readonly string DeliverySent = "Delivery Sent";
        public static readonly string DeliveryCompleted = "Delivery Completed";
        public static readonly string InInventory = "In Inventory";
    }
}
