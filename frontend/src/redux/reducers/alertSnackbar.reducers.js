import {
  CLOSE_ALERT_SNACKBAR,
  OPEN_ERROR_ALERT_SNACKBAR,
  OPEN_SUCCESS_ALERT_SNACKBAR,
} from "../action_types/alertSnackbar";

export const alertSnackbarReducer = (state = {}, action) => {
  switch (action.type) {
    case OPEN_ERROR_ALERT_SNACKBAR:
      return { open: true, severity: "error", message: action.payload };
    case OPEN_SUCCESS_ALERT_SNACKBAR:
      return { open: true, severity: "success", message: action.payload };
    case CLOSE_ALERT_SNACKBAR:
      return { ...state, open: false };
    default:
      return state;
  }
};
