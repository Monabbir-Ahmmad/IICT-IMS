import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../action_types/auth";
import authService from "../../services/auth.service";
import { UserRoles } from "../../constants/enums";
import { showSuccessAlert } from "./alertSnackbar.actions";

export const signup = (registrationData, userType) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    if (userType === UserRoles.SUPPLIER) {
      await authService.registerSupplier(registrationData);
    } else {
      await authService.register(registrationData);
    }

    dispatch({
      type: USER_REGISTER_SUCCESS,
    });

    dispatch(
      showSuccessAlert(
        "Account creation request received. Please wait for approval email to login."
      )
    );
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data?.message
          ? error.response.data?.message
          : error.message,
    });
  }
};

export const signin = (email, password, userType) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    let res;

    if (userType === UserRoles.EMPLOYEE) {
      res = await authService.login(email, password);
    } else if (userType === UserRoles.SUPPLIER) {
      res = await authService.loginSupplier(email, password);
    }

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data?.message
          ? error.response.data?.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  authService.logout();

  dispatch({
    type: USER_LOGOUT,
  });
};
