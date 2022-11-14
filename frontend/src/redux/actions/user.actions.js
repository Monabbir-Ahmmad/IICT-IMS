import { UserRoles } from "../../constants/enums";
import { showErrorAlert, showSuccessAlert } from "./alertSnackbar.actions";
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_PASSWORD_UPDATE_FAIL,
  USER_PASSWORD_UPDATE_REQUEST,
  USER_PASSWORD_UPDATE_RESET,
  USER_PASSWORD_UPDATE_SUCCESS,
  USER_PROFILE_UPDATE_FAIL,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_RESET,
  USER_PROFILE_UPDATE_SUCCESS,
} from "../action_types/user";
import userService from "../../services/user.service";

export const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    let res;

    const {
      userLogin: { userAuth },
    } = getState();

    if (userAuth?.role === UserRoles.SUPPLIER) {
      res = await userService.getSupplierProfile(userAuth?.id);
    } else {
      res = await userService.getUserProfile(userAuth?.id);
    }

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data?.message
        ? error.response.data?.message
        : error.message;
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: errorMessage,
    });

    dispatch(showErrorAlert(errorMessage));
  }
};

export const updateUserProfile = (data) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_PROFILE_UPDATE_REQUEST });

    let res;

    const {
      userLogin: { userAuth },
    } = getState();

    if (userAuth?.role === UserRoles.SUPPLIER) {
      res = await userService.updateSupplierProfile(data);
    } else {
      res = await userService.updateUserProfile(data);
    }

    dispatch({
      type: USER_PROFILE_UPDATE_SUCCESS,
    });

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: res.data,
    });

    dispatch(showSuccessAlert("Profile updated successfully"));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data?.message
        ? error.response.data?.message
        : error.message;
    dispatch({
      type: USER_PROFILE_UPDATE_FAIL,
      payload: errorMessage,
    });

    dispatch(showErrorAlert(errorMessage));
  }

  setTimeout(() => {
    dispatch({ type: USER_PROFILE_UPDATE_RESET });
  }, 5000);
};

export const updatePassword = (data) => async (dispatch) => {
  try {
    dispatch({ type: USER_PASSWORD_UPDATE_REQUEST });

    await userService.updatePassword(data);

    dispatch({
      type: USER_PASSWORD_UPDATE_SUCCESS,
    });

    dispatch(showSuccessAlert("Password updated successfully"));
  } catch (error) {
    const errorMessage =
      error.response && error.response.data?.message
        ? error.response.data?.message
        : error.message;
    dispatch({
      type: USER_PASSWORD_UPDATE_FAIL,
      payload: errorMessage,
    });

    dispatch(showErrorAlert(errorMessage));
  }

  setTimeout(() => {
    dispatch({ type: USER_PASSWORD_UPDATE_RESET });
  }, 5000);
};
