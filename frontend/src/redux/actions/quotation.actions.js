import quotationService from "../../services/quotation.service";
import { GET_PROCUREMENT_SUCCESS } from "../action_types/procurement";
import {
  CREATE_QUOTATION_FAIL,
  CREATE_QUOTATION_REQUEST,
  CREATE_QUOTATION_RESET,
  CREATE_QUOTATION_SUCCESS,
} from "../action_types/quotation";
import { showErrorAlert, showSuccessAlert } from "./alertSnackbar.actions";

export const createQuotation = (data) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_QUOTATION_REQUEST });

    const res = await quotationService.create(data);

    dispatch({ type: CREATE_QUOTATION_SUCCESS });

    dispatch({ type: GET_PROCUREMENT_SUCCESS, payload: res.data });

    dispatch(showSuccessAlert("Quotation created successfully"));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data?.message
        ? error.response.data?.message
        : error.message;
    dispatch({
      type: CREATE_QUOTATION_FAIL,
      payload: errorMessage,
    });

    dispatch(showErrorAlert(errorMessage));
  }

  setTimeout(() => {
    dispatch({ type: CREATE_QUOTATION_RESET });
  }, 5000);
};
