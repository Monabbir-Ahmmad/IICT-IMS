const textOperators = [
  { value: "==", label: "Equals" },
  { value: "!=", label: "Not Equals" },
  { value: "Contains", label: "Contains" },
  { value: "StartsWith", label: "Starts With" },
  { value: "EndsWith", label: "Ends With" },
];

const numberOperators = [
  { value: "==", label: "Equals" },
  { value: "!=", label: "Not Equals" },
  { value: ">", label: "Greater Than" },
  { value: ">=", label: "Greater Than or Equal" },
  { value: "<", label: "Less Than" },
  { value: "<=", label: "Less Than or Equal" },
];

const dateOperators = [
  { value: "==", label: "Equals" },
  { value: "!=", label: "Not Equals" },
  { value: ">", label: "Greater Than" },
  { value: ">=", label: "Greater Than or Equal" },
  { value: "<", label: "Less Than" },
  { value: "<=", label: "Less Than or Equal" },
];

export const inventoryFilterDef = [
  {
    field: "id",
    key: "id",
    label: "ID",
    type: "number",
    operators: numberOperators,
  },
  {
    field: "name",
    key: "product.name",
    label: "Product Name",
    type: "search",
    operators: textOperators,
  },
  {
    field: "category",
    key: "product.category.name",
    label: "Product Category",
    type: "search",
    operators: textOperators,
  },
  {
    field: "manufacturer",
    key: "product.manufacturer",
    label: "Manufacturer",
    type: "search",
    operators: textOperators,
  },
  {
    field: "price",
    key: "price",
    label: "Price",
    type: "number",
    operators: numberOperators,
  },
  {
    field: "warrantyExpiryDate",
    key: "warrantyExpiryDate",
    label: "Warranty Expiry Date",
    type: "date",
    operators: dateOperators,
  },
  {
    field: "status",
    key: "status",
    label: "Status",
    type: "search",
    operators: textOperators,
  },
];

export const distributorHistoryFilterDef = [
  {
    field: "id",
    key: "id",
    label: "ID",
    type: "number",
    operators: numberOperators,
  },
  {
    field: "distriutorName",
    key: "distributor.username",
    label: "Distributor Name",
    type: "search",
    operators: textOperators,
  },
  {
    field: "distributedToName",
    key: "distributedTo.username",
    label: "Distributee Name",
    type: "search",
    operators: textOperators,
  },
  {
    field: "distributionDate",
    key: "distributionDate",
    label: "Distribution Date",
    type: "date",
    operators: dateOperators,
  },
  {
    field: "distributionRoom",
    key: "distributionRoom",
    label: "Distribution Room",
    type: "search",
    operators: textOperators,
  },
];

export const receiveReturnHistoryFilterDef = [
  {
    field: "id",
    key: "id",
    label: "ID",
    type: "number",
    operators: numberOperators,
  },
  {
    field: "receiverName",
    key: "receiver.username",
    label: "Receiver Name",
    type: "search",
    operators: textOperators,
  },
  {
    field: "receivedFromName",
    key: "receivedFrom.username",
    label: "Returner Name",
    type: "search",
    operators: textOperators,
  },
  {
    field: "receivingDate",
    key: "receivingDate",
    label: "Receiving Date",
    type: "date",
    operators: dateOperators,
  },
];

export const orderRequestFilterDef = [
  {
    field: "title",
    key: "title",
    label: "Title",
    type: "search",
    operators: textOperators,
  },
  {
    field: "createdBy",
    key: "createdBy.username",
    label: "Created By",
    type: "search",
    operators: textOperators,
  },
  {
    field: "createdAt",
    key: "createdAt",
    label: "Order Date",
    type: "date",
    operators: dateOperators,
  },
  {
    field: "deliveryDeadline",
    key: "deliveryDeadline",
    label: "Delivery Deadline",
    type: "date",
    operators: dateOperators,
  },
  {
    field: "deliveryDate",
    key: "deliveryDate",
    label: "Delivery Date",
    type: "date",
    operators: dateOperators,
  },
  {
    field: "totalPrice",
    key: "totalPrice",
    label: "Total Price",
    type: "number",
    operators: numberOperators,
  },
  {
    field: "status",
    key: "status",
    label: "Status",
    type: "search",
    operators: textOperators,
  },
];

export const procurementFilterDef = [
  {
    field: "id",
    key: "id",
    label: "ID",
    type: "number",
    operators: numberOperators,
  },
  {
    field: "title",
    key: "title",
    label: "Title",
    type: "search",
    operators: textOperators,
  },
  {
    field: "category",
    key: "category.name",
    label: "Category",
    type: "search",
    operators: textOperators,
  },
  {
    field: "createdBy",
    key: "createdBy.username",
    label: "Created By",
    type: "search",
    operators: textOperators,
  },
  {
    field: "createdAt",
    key: "createdAt",
    label: "Issue Date",
    type: "date",
    operators: dateOperators,
  },
  {
    field: "deadline",
    key: "deadline",
    label: "Deadline",
    type: "date",
    operators: dateOperators,
  },
  {
    field: "estimatedTotalPrice",
    key: "estimatedTotalPrice",
    label: "Estimated Total Price",
    type: "number",
    operators: numberOperators,
  },
  {
    field: "status",
    key: "status",
    label: "Status",
    type: "search",
    operators: textOperators,
  },
];

export const purchaseOrderFilterDef = [
  {
    field: "id",
    key: "id",
    label: "ID",
    type: "number",
    operators: numberOperators,
  },
  {
    field: "title",
    key: "title",
    label: "Title",
    type: "search",
    operators: textOperators,
  },
  {
    field: "createdBy",
    key: "createdBy.username",
    label: "Created By",
    type: "search",
    operators: textOperators,
  },
  {
    field: "createdAt",
    key: "createdAt",
    label: "Order Date",
    type: "date",
    operators: dateOperators,
  },
  {
    field: "deliveryDeadline",
    key: "deliveryDeadline",
    label: "Delivery Deadline",
    type: "date",
    operators: dateOperators,
  },
  {
    field: "deliveryDate",
    key: "deliveryDate",
    label: "Delivery Date",
    type: "date",
    operators: dateOperators,
  },
  {
    field: "totalPrice",
    key: "totalPrice",
    label: "Total Price",
    type: "number",
    operators: numberOperators,
  },
  {
    field: "status",
    key: "status",
    label: "Status",
    type: "search",
    operators: textOperators,
  },
];

export const procurementRequestFilterDef = [
  {
    field: "title",
    key: "title",
    label: "Title",
    type: "search",
    operators: textOperators,
  },
  {
    field: "createdBy",
    key: "createdBy.username",
    label: "Created By",
    type: "search",
    operators: textOperators,
  },
  {
    field: "createdAt",
    key: "createdAt",
    label: "Issue Date",
    type: "date",
    operators: dateOperators,
  },
  {
    field: "deadline",
    key: "deadline",
    label: "Deadline",
    type: "date",
    operators: dateOperators,
  },
  {
    field: "estimatedTotalPrice",
    key: "estimatedTotalPrice",
    label: "Estimated Total Price",
    type: "number",
    operators: numberOperators,
  },
];

export const distributableInventoryFilterDef = [
  {
    field: "id",
    key: "id",
    label: "ID",
    type: "number",
    operators: numberOperators,
  },
  {
    field: "name",
    key: "product.name",
    label: "Product Name",
    type: "search",
    operators: textOperators,
  },
  {
    field: "category",
    key: "product.category.name",
    label: "Product Category",
    type: "search",
    operators: textOperators,
  },
  {
    field: "manufacturer",
    key: "product.manufacturer",
    label: "Manufacturer",
    type: "search",
    operators: textOperators,
  },
  {
    field: "details",
    key: "product.details",
    label: "Details",
    type: "search",
    operators: textOperators,
  },
  {
    field: "price",
    key: "price",
    label: "Price",
    type: "number",
    operators: numberOperators,
  },
  {
    field: "warrantyExpiryDate",
    key: "warrantyExpiryDate",
    label: "Warranty Expiry Date",
    type: "date",
    operators: dateOperators,
  },
  {
    field: "status",
    key: "status",
    label: "Status",
    type: "search",
    operators: textOperators,
  },
];
