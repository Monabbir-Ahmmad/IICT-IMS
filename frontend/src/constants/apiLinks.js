//Host of the api
export const API_URL = "https://localhost:5001";

//Authentication
export const POST_REFRESH_TOKEN = "/auth/refreshToken";
export const POST_USER_REGISTER = `/auth/register`;
export const POST_SUPPLIER_REGISTER = `/auth/supplier/register`;
export const POST_USER_LOGIN = `/auth/login`;
export const POST_SUPPLIER_LOGIN = `/auth/supplier/login`;

//Auto complete
export const GET_AUTO_COMPLETE_USER_ROLES = `/autoComplete/userRoles`;
export const GET_AUTO_COMPLETE_PRODUCT_CATEGORIES = `/autoComplete/productCategories`;

//User
export const GET_USER_PROFILE = "/user/profile";
export const UPDATE_USER_PROFILE = "/user/profile";
export const UPDATE_USER_PASSWORD = "/user/password";
export const GET_USER_LIST = "/user/users";

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
export const CREATE_QUOTATION = "/supplier/quotation/create";

//Purchase order
export const CREATE_PURCHASE_ORDER = "/purchaseOrder/create";
export const GET_PURCHASE_ORDER_LIST = "/purchaseOrder";
export const GET_PURCHASE_ORDER = "/purchaseOrder";
export const SEND_PURCHASE_ORDER_DELIVERY = "/purchaseOrder/delivery";
export const CONFIRM_PURCHASE_ORDER_DELIVERY_RECEIVE =
  "/purchaseOrder/delivery/receive";
