import inventoryService from "../../services/inventory.service";
import {
  DISTRIBUTE_INVENTORY_FAIL,
  DISTRIBUTE_INVENTORY_REQUEST,
  DISTRIBUTE_INVENTORY_RESET,
  DISTRIBUTE_INVENTORY_SUCCESS,
  GET_DISTRIBUTABLE_INVENTORY_LIST_FAIL,
  GET_DISTRIBUTABLE_INVENTORY_LIST_REQUEST,
  GET_DISTRIBUTABLE_INVENTORY_LIST_SUCCESS,
  GET_INVENTORY_LIST_FAIL,
  GET_INVENTORY_LIST_REQUEST,
  GET_INVENTORY_LIST_SUCCESS,
  GET_RECEIVABLE_INVENTORY_LIST_FAIL,
  GET_RECEIVABLE_INVENTORY_LIST_REQUEST,
  GET_RECEIVABLE_INVENTORY_LIST_SUCCESS,
} from "../action_types/inventory";
import { showErrorAlert, showSuccessAlert } from "./alertSnackbar.actions";

export const distributeInventory = (data) => async (dispatch) => {
  try {
    dispatch({
      type: DISTRIBUTE_INVENTORY_REQUEST,
    });

    await inventoryService.distribute(data);

    dispatch({
      type: DISTRIBUTE_INVENTORY_SUCCESS,
    });

    dispatch(showSuccessAlert("Products distributed successfully"));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data?.message
        ? error.response.data?.message
        : error.message;
    dispatch({
      type: DISTRIBUTE_INVENTORY_FAIL,
      payload: errorMessage,
    });

    dispatch(showErrorAlert(errorMessage));
  }

  setTimeout(() => {
    dispatch({ type: DISTRIBUTE_INVENTORY_RESET });
  }, 5000);
};

export const getInventoryList = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_INVENTORY_LIST_REQUEST,
    });

    const res = await inventoryService.getAll();

    dispatch({
      type: GET_INVENTORY_LIST_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data?.message
        ? error.response.data?.message
        : error.message;
    dispatch({
      type: GET_INVENTORY_LIST_FAIL,
      payload: errorMessage,
    });

    dispatch(showErrorAlert(errorMessage));
  }
};

export const getDistributableInventoryList = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_DISTRIBUTABLE_INVENTORY_LIST_REQUEST,
    });

    const res = await inventoryService.getDistributable();

    dispatch({
      type: GET_DISTRIBUTABLE_INVENTORY_LIST_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data?.message
        ? error.response.data?.message
        : error.message;
    dispatch({
      type: GET_DISTRIBUTABLE_INVENTORY_LIST_FAIL,
      payload: errorMessage,
    });

    dispatch(showErrorAlert(errorMessage));
  }
};

export const getReceivableInventoryList = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_RECEIVABLE_INVENTORY_LIST_REQUEST,
    });

    const res = await inventoryService.getReceivable();

    dispatch({
      type: GET_RECEIVABLE_INVENTORY_LIST_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data?.message
        ? error.response.data?.message
        : error.message;
    dispatch({
      type: GET_RECEIVABLE_INVENTORY_LIST_FAIL,
      payload: errorMessage,
    });

    dispatch(showErrorAlert(errorMessage));
  }
};
