import purchaseOrderService from "../../services/purchaseOrder.service";
import {
  CONFIRM_DELIVERY_FAIL,
  CONFIRM_DELIVERY_REQUEST,
  CONFIRM_DELIVERY_RESET,
  CONFIRM_DELIVERY_SUCCESS,
  DELIVER_PURCHASE_ORDER_FAIL,
  DELIVER_PURCHASE_ORDER_REQUEST,
  DELIVER_PURCHASE_ORDER_RESET,
  DELIVER_PURCHASE_ORDER_SUCCESS,
  GET_PURCHASE_ORDER_LIST_FAIL,
  GET_PURCHASE_ORDER_LIST_REQUEST,
  GET_PURCHASE_ORDER_LIST_SUCCESS,
  GET_PURCHASE_ORDER_SUCCESS,
} from "../action_types/purchaseOrder";
import { showErrorAlert, showSuccessAlert } from "./alertSnackbar.actions";

export const getPurchaseOrder = (id) => async (dispatch) => {
  try {
    const res = await purchaseOrderService.get(id);
    dispatch({
      type: GET_PURCHASE_ORDER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data?.message
        ? error.response.data?.message
        : error.message;
    dispatch({
      type: DELIVER_PURCHASE_ORDER_FAIL,
      payload: errorMessage,
    });

    dispatch(showErrorAlert(errorMessage));
  }
};

export const getPurchaseOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_PURCHASE_ORDER_LIST_REQUEST,
    });

    const res = await purchaseOrderService.getAll();

    dispatch({
      type: GET_PURCHASE_ORDER_LIST_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data?.message
        ? error.response.data?.message
        : error.message;
    dispatch({
      type: GET_PURCHASE_ORDER_LIST_FAIL,
      payload: errorMessage,
    });

    dispatch(showErrorAlert(errorMessage));
  }
};

export const sendDelivery = (data) => async (dispatch) => {
  try {
    dispatch({ type: DELIVER_PURCHASE_ORDER_REQUEST });

    const res = await purchaseOrderService.sendDelivery(data);

    dispatch({ type: DELIVER_PURCHASE_ORDER_SUCCESS });

    dispatch({ type: GET_PURCHASE_ORDER_SUCCESS, payload: res.data });

    dispatch(showSuccessAlert("Delivery sent successfully"));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data?.message
        ? error.response.data?.message
        : error.message;
    dispatch({
      type: DELIVER_PURCHASE_ORDER_FAIL,
      payload: errorMessage,
    });

    dispatch(showErrorAlert(errorMessage));
  }

  setTimeout(() => {
    dispatch({ type: DELIVER_PURCHASE_ORDER_RESET });
  }, 5000);
};

export const confirmDelivery = (id) => async (dispatch) => {
  try {
    dispatch({ type: CONFIRM_DELIVERY_REQUEST });

    const res = await purchaseOrderService.confirmDeliveryReceive(id);

    dispatch({ type: CONFIRM_DELIVERY_SUCCESS });

    dispatch({ type: GET_PURCHASE_ORDER_LIST_SUCCESS, payload: res.data });

    dispatch(showSuccessAlert("Delivery received successfully"));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data?.message
        ? error.response.data?.message
        : error.message;
    dispatch({
      type: CONFIRM_DELIVERY_FAIL,
      payload: errorMessage,
    });

    dispatch(showErrorAlert(errorMessage));
  }

  setTimeout(() => {
    dispatch({ type: CONFIRM_DELIVERY_RESET });
  }, 5000);
};
