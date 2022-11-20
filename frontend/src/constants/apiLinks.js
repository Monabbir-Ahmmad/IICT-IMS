//Host of the api
export const API_URL = "http://localhost:5000";

//Authentication
export const POST_REFRESH_TOKEN = "/auth/refreshToken";
export const POST_USER_REGISTER = `/auth/register`;
export const POST_SUPPLIER_REGISTER = `/auth/supplier/register`;
export const POST_USER_LOGIN = `/auth/login`;
export const POST_SUPPLIER_LOGIN = `/auth/supplier/login`;
export const POST_LOGOUT = `/auth/logout`;

//Auto complete
export const GET_AUTO_COMPLETE_USER_ROLES = `/autoComplete/public/userRoles`;
export const GET_AUTO_COMPLETE_USERS = `/autoComplete/users`;
export const GET_AUTO_COMPLETE_PRODUCT_CATEGORIES = `/autoComplete/public/productCategories`;

//User
export const GET_USER_PROFILE = "/user/profile";
export const GET_SUPPLIER_PROFILE = "/user/supplier/profile";
export const UPDATE_USER_PROFILE = "/user/profile";
export const UPDATE_SUPPLIER_PROFILE = "/user/supplier/profile";
export const UPDATE_USER_PASSWORD = "/user/password";

//Product category
export const CREATE_PRODUCT_CATEGORY = "/productCategory/create";
export const GET_PRODUCT_CATEGORIES = "/productCategory";
export const UPDATE_PRODUCT_CATEGORY = "/productCategory";
export const CREATE_PROCUREMENT = "/procurement/create";

//Procurement
export const GET_PROCUREMENTS = "/procurement";
export const GET_PROCUREMENT = "/procurement";
export const DELETE_PROCUREMENT = "/procurement";

//Supplier quotation
export const CREATE_QUOTATION = "/supplier/Quotation/create";
export const GET_PROCUREMENT_REQUEST_LIST =
  "/supplier/Quotation/procurement-requests";

//Purchase order
export const CREATE_PURCHASE_ORDER = "/purchaseOrder/create";
export const GET_PURCHASE_ORDER_LIST = "/purchaseOrder";
export const GET_ORDER_REQUEST_LIST = "/purchaseOrder/order-request";
export const GET_ORDER_REQUEST = "/purchaseOrder/order-request";
export const GET_PURCHASE_ORDER = "/purchaseOrder";
export const SEND_PURCHASE_ORDER_DELIVERY = "/purchaseOrder/delivery";
export const CONFIRM_PURCHASE_ORDER_DELIVERY_RECEIVE =
  "/purchaseOrder/delivery/receive";

//Inventory
export const GET_INVENTORY = "/inventory";
export const GET_INVENTORY_LIST = "/inventory";
export const GET_DISTRIBUTABLE_INVENTORY = "/inventory/distributable";
export const DISTRIBUTE_INVENTORY = "/inventory/distribute";
export const RECEIVE_RETURN_INVENTORY = "/inventory/receive-return";
export const GET_RECEIVABLE_INVENTORY = "/inventory/receivable";
export const GET_INVENTORY_PRODUCT = "/inventory/product";
export const GET_DISTRIBUTION_HISTORY = "/inventory/distribution-history";
export const GET_RECEIVE_RETURN_HISTORY = "/inventory/receive-return-history";

//Admin
export const GET_PENDING_COUNTS = "/admin/pending-counts";
export const GET_PENDING_USERS = "/admin/pending-users";
export const GET_PENDING_SUPPLIERS = "/admin/pending-suppliers";
export const GET_PENDING_PROCUREMENTS = "/admin/pending-procurements";
export const GET_PENDING_PURCHASE_ORDERS = "/admin/pending-purchase-orders";
export const APPROVE_USER = "/admin/approve-user";
export const REJECT_USER = "/admin/reject-user";
export const APPROVE_SUPPLIER = "/admin/approve-supplier";
export const REJECT_SUPPLIER = "/admin/reject-supplier";
export const APPROVE_PROCUREMENT = "/admin/approve-procurement";
export const REJECT_PROCUREMENT = "/admin/reject-procurement";
export const APPROVE_PURCHASE_ORDER = "/admin/approve-purchase-order";
