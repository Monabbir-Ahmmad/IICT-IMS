import {
  CLOSE_ALERT_SNACKBAR,
  OPEN_ERROR_ALERT_SNACKBAR,
  OPEN_SUCCESS_ALERT_SNACKBAR,
} from "../action_types/alertSnackbar";

export const showErrorAlert = (message) => async (dispatch) => {
  dispatch({
    type: OPEN_ERROR_ALERT_SNACKBAR,
    payload: message,
  });

  setTimeout(() => dispatch(closeAlert()), 5000);
};

export const showSuccessAlert = (message) => async (dispatch) => {
  dispatch({
    type: OPEN_SUCCESS_ALERT_SNACKBAR,
    payload: message,
  });

  setTimeout(() => dispatch(closeAlert()), 5000);
};

export const closeAlert = () => async (dispatch) => {
  dispatch({
    type: CLOSE_ALERT_SNACKBAR,
  });
};
