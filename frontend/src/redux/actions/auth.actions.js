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
import { UserRoles } from "../../constants/userRoles";

export const signup = (registrationData, userType) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    let res;
    if (userType === UserRoles.EMPLOYEE) {
      res = await authService.register(registrationData);
    } else if (userType === UserRoles.SUPPLIER) {
      res = await authService.registerSupplier(registrationData);
    }

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: res?.data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: res?.data,
    });
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
