import {
  DELIVER_PURCHASE_ORDER_FAIL,
  DELIVER_PURCHASE_ORDER_REQUEST,
  DELIVER_PURCHASE_ORDER_RESET,
  DELIVER_PURCHASE_ORDER_SUCCESS,
  GET_PURCHASE_ORDER_FAIL,
  GET_PURCHASE_ORDER_LIST_FAIL,
  GET_PURCHASE_ORDER_LIST_REQUEST,
  GET_PURCHASE_ORDER_LIST_SUCCESS,
  GET_PURCHASE_ORDER_REQUEST,
  GET_PURCHASE_ORDER_SUCCESS,
} from "../action_types/purchaseOrder";

export const singlePurchaseOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PURCHASE_ORDER_REQUEST:
      return { loading: true };
    case GET_PURCHASE_ORDER_SUCCESS:
      return { loading: false, purchaseOrder: action.payload };
    case GET_PURCHASE_ORDER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const purchaseOrdersReducer = (
  state = { purchaseOrders: [] },
  action
) => {
  switch (action.type) {
    case GET_PURCHASE_ORDER_LIST_REQUEST:
      return { loading: true, purchaseOrders: [] };
    case GET_PURCHASE_ORDER_LIST_SUCCESS:
      return { loading: false, purchaseOrders: action.payload };
    case GET_PURCHASE_ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const deliverPurchaseOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case DELIVER_PURCHASE_ORDER_REQUEST:
      return { loading: true };
    case DELIVER_PURCHASE_ORDER_SUCCESS:
      return { loading: false, success: true };
    case DELIVER_PURCHASE_ORDER_FAIL:
      return { loading: false, success: false, error: action.payload };
    case DELIVER_PURCHASE_ORDER_RESET:
      return { loading: false, success: false };
    default:
      return state;
  }
};
