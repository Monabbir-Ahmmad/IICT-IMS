import quotationService from "../../services/quotation.service";
import {
  CREATE_QUOTATION_FAIL,
  CREATE_QUOTATION_REQUEST,
  CREATE_QUOTATION_RESET,
  CREATE_QUOTATION_SUCCESS,
} from "../action_types/quotation";

export const createQuotation = (data) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_QUOTATION_REQUEST });

    const res = await quotationService.create(data);

    dispatch({
      type: CREATE_QUOTATION_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_QUOTATION_FAIL,
      payload:
        error.response && error.response.data?.message
          ? error.response.data?.message
          : error.message,
    });
  }

  setTimeout(() => {
    dispatch({ type: CREATE_QUOTATION_RESET });
  }, 5000);
};
