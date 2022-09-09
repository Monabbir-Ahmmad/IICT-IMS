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

export const procurementCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PROCUREMENT_REQUEST:
      return { loading: true };
    case CREATE_PROCUREMENT_SUCCESS:
      return { loading: false, success: true };
    case CREATE_PROCUREMENT_FAIL:
      return { loading: false, success: false, error: action.payload };
    case CREATE_PROCUREMENT_RESET:
      return { loading: false, success: false };
    default:
      return state;
  }
};

export const procurementListReducer = (
  state = { procurements: [] },
  action
) => {
  switch (action.type) {
    case GET_PROCUREMENT_LIST_REQUEST:
      return { loading: true, procurements: [] };
    case GET_PROCUREMENT_LIST_SUCCESS:
      return { loading: false, procurements: action.payload };
    case GET_PROCUREMENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const procurementDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PROCUREMENT_REQUEST:
      return { loading: true };
    case DELETE_PROCUREMENT_SUCCESS:
      return { loading: false, success: true };
    case DELETE_PROCUREMENT_FAIL:
      return { loading: false, success: false, error: action.payload };
    case DELETE_PROCUREMENT_RESET:
      return { loading: false, success: false };
    default:
      return state;
  }
};
