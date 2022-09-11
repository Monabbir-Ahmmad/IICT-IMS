import {
  CREATE_QUOTATION_FAIL,
  CREATE_QUOTATION_REQUEST,
  CREATE_QUOTATION_RESET,
  CREATE_QUOTATION_SUCCESS,
} from "../action_types/quotation";

export const quotationCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_QUOTATION_REQUEST:
      return { loading: true };
    case CREATE_QUOTATION_SUCCESS:
      return { loading: false, success: true };
    case CREATE_QUOTATION_FAIL:
      return { loading: false, success: false, error: action.payload };
    case CREATE_QUOTATION_RESET:
      return { loading: false, success: false };
    default:
      return state;
  }
};
