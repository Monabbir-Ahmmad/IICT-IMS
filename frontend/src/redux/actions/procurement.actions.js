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
  GET_PROCUREMENT_LIST_FAIL,
  GET_PROCUREMENT_LIST_REQUEST,
  GET_PROCUREMENT_LIST_SUCCESS,
} from "../action_types/procurement";

export const createProcurement = (data) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PROCUREMENT_REQUEST });

    const res = await procurementService.create(data);

    dispatch({
      type: CREATE_PROCUREMENT_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_PROCUREMENT_FAIL,
      payload:
        error.response && error.response.data?.message
          ? error.response.data?.message
          : error.message,
    });
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
    dispatch({
      type: GET_PROCUREMENT_LIST_FAIL,
      payload:
        error.response && error.response.data?.message
          ? error.response.data?.message
          : error.message,
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
  } catch (error) {
    console.log(error);
    dispatch({
      type: DELETE_PROCUREMENT_FAIL,
      payload:
        error.response && error.response.data?.message
          ? error.response.data?.message
          : error.message,
    });
  }

  setTimeout(() => {
    dispatch({ type: DELETE_PROCUREMENT_RESET });
  }, 5000);
};
