import procurementService from "../../services/procurement.service";
import {
  CREATE_PROCUREMENT_FAIL,
  CREATE_PROCUREMENT_REQUEST,
  CREATE_PROCUREMENT_RESET,
  CREATE_PROCUREMENT_SUCCESS,
  DELETE_PROCUREMENT_FAIL,
  DELETE_PROCUREMENT_REQUEST,
  DELETE_PROCUREMENT_RESET,
  DELETE_PROCUREMENT_SUCCESS,
  GET_PROCUREMENT_FAIL,
  GET_PROCUREMENT_LIST_FAIL,
  GET_PROCUREMENT_LIST_REQUEST,
  GET_PROCUREMENT_LIST_SUCCESS,
  GET_PROCUREMENT_REQUEST,
  GET_PROCUREMENT_SUCCESS,
  PROCUREMENT_QUOTATION_ACCEPT_FAIL,
  PROCUREMENT_QUOTATION_ACCEPT_REQUEST,
  PROCUREMENT_QUOTATION_ACCEPT_RESET,
  PROCUREMENT_QUOTATION_ACCEPT_SUCCESS,
} from "../action_types/procurement";
import { showErrorAlert, showSuccessAlert } from "./alertSnackbar.actions";

export const createProcurement = (data) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PROCUREMENT_REQUEST });

    const res = await procurementService.create(data);

    dispatch({
      type: CREATE_PROCUREMENT_SUCCESS,
      payload: res.data,
    });

    dispatch(showSuccessAlert("Procurement created successfully"));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data?.message
        ? error.response.data?.message
        : error.message;

    dispatch({
      type: CREATE_PROCUREMENT_FAIL,
      payload: errorMessage,
    });

    dispatch(showErrorAlert(errorMessage));
  }

  setTimeout(() => {
    dispatch({ type: CREATE_PROCUREMENT_RESET });
  }, 5000);
};

export const getProcurementList = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PROCUREMENT_LIST_REQUEST });

    const res = await procurementService.getAll();

    dispatch({
      type: GET_PROCUREMENT_LIST_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data?.message
        ? error.response.data?.message
        : error.message;

    dispatch({
      type: GET_PROCUREMENT_LIST_FAIL,
      payload: errorMessage,
    });
  }
};

export const getProcurement = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_PROCUREMENT_REQUEST });

    const res = await procurementService.get(id);

    dispatch({
      type: GET_PROCUREMENT_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data?.message
        ? error.response.data?.message
        : error.message;

    dispatch({
      type: GET_PROCUREMENT_FAIL,
      payload: errorMessage,
    });
  }
};

export const deleteProcurement = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_PROCUREMENT_REQUEST });

    await procurementService.delete(id);

    dispatch({
      type: DELETE_PROCUREMENT_SUCCESS,
    });

    const { procurementList } = getState();

    dispatch({
      type: GET_PROCUREMENT_LIST_SUCCESS,
      payload: procurementList.procurements.filter(
        (procurement) => procurement.id !== id
      ),
    });

    dispatch(showSuccessAlert("Procurement deleted successfully"));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data?.message
        ? error.response.data?.message
        : error.message;

    dispatch({
      type: DELETE_PROCUREMENT_FAIL,
      payload: errorMessage,
    });

    dispatch(showErrorAlert(errorMessage));
  }

  setTimeout(() => {
    dispatch({ type: DELETE_PROCUREMENT_RESET });
  }, 5000);
};

export const procurementQuotationAccept =
  (data) => async (dispatch, getState) => {
    try {
      dispatch({ type: PROCUREMENT_QUOTATION_ACCEPT_REQUEST });

      const res = await procurementService.acceptQuotation(data);

      dispatch({ type: PROCUREMENT_QUOTATION_ACCEPT_SUCCESS });

      dispatch({ type: GET_PROCUREMENT_SUCCESS, payload: res.data });

      dispatch(showSuccessAlert("Quotation accepted successfully"));
    } catch (error) {
      const errorMessage =
        error.response && error.response.data?.message
          ? error.response.data?.message
          : error.message;

      dispatch({
        type: PROCUREMENT_QUOTATION_ACCEPT_FAIL,
        payload: errorMessage,
      });

      dispatch(showErrorAlert(errorMessage));
    }

    setTimeout(() => {
      dispatch({ type: PROCUREMENT_QUOTATION_ACCEPT_RESET });
    }, 5000);
  };
