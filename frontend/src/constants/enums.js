export const UserRoles = {
  ADMIN: "Admin",
  DIRECTOR: "Director",
  OFFICE_MANAGER: "Office Manager",
  STORE_MANAGER: "Store Manager",
  OFFICE_OFFICER: "Office Officer",
  STORE_OFFICER: "Store Officer",
  EMPLOYEE: "Normal Employee",
  SUPPLIER: "Supplier",
};

export const Status = {
  NotOffered: "Not Offered",
  NoOffer: "No Offer",
  Pending: "Pending",
  PendingApproval: "Pending Approval",
  OfferAvailable: "Offer Available",
  OfferSent: "Offer Sent",
  OrderAccepted: "Order Accepted",
  InInventory: "In Inventory",
  Distributed: "Distributed",
  Approved: "Approved",
  OfferAccepted: "Offer Accepted",
  DeliveryCompleted: "Delivery Completed",
  OfferRejected: "Offer Rejected",
  PermanentlyDamaged: "Permanently Damaged",
  TemporarilyDamaged: "Temporarily Damaged",
};

export const UpdatableStatus = [
  Status.InInventory,
  Status.TemporarilyDamaged,
  Status.PermanentlyDamaged,
];
