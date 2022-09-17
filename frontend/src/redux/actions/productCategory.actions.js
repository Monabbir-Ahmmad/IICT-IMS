import productCategoryService from "../../services/productCategory.service";
import {
  CREATE_PRODUCT_CATEGORY_FAIL,
  CREATE_PRODUCT_CATEGORY_REQUEST,
  CREATE_PRODUCT_CATEGORY_RESET,
  CREATE_PRODUCT_CATEGORY_SUCCESS,
  GET_PRODUCT_CATEGORY_LIST_REQUEST,
  GET_PRODUCT_CATEGORY_LIST_SUCCESS,
  GET_PRODUCT_CATEGORY_LIST_FAIL,
  UPDATE_PRODUCT_CATEGORY_FAIL,
  UPDATE_PRODUCT_CATEGORY_REQUEST,
  UPDATE_PRODUCT_CATEGORY_RESET,
  UPDATE_PRODUCT_CATEGORY_SUCCESS,
} from "../action_types/productCategory";
import { showErrorAlert } from "./alertSnackbar.actions";

export const createProductCategory = (name) => async (dispatch) => {
  try {
    dispatch({ type: CREATE_PRODUCT_CATEGORY_REQUEST });

    const res = await productCategoryService.create(name);

    dispatch({
      type: CREATE_PRODUCT_CATEGORY_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: CREATE_PRODUCT_CATEGORY_FAIL,
      payload:
        error.response && error.response.data?.message
          ? error.response.data?.message
          : error.message,
    });
  }

  setTimeout(() => {
    dispatch({ type: CREATE_PRODUCT_CATEGORY_RESET });
  }, 4000);
};

export const getAllProductCategories = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCT_CATEGORY_LIST_REQUEST });

    const res = await productCategoryService.getAll();

    dispatch({
      type: GET_PRODUCT_CATEGORY_LIST_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data?.message
        ? error.response.data?.message
        : error.message;
    dispatch({
      type: GET_PRODUCT_CATEGORY_LIST_FAIL,
      payload: errorMessage,
    });

    dispatch(showErrorAlert("Unable to fetch categories. " + errorMessage));
  }
};

export const updateProductCategory = (id, name) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PRODUCT_CATEGORY_REQUEST });

    const res = await productCategoryService.update(id, name);

    dispatch({
      type: UPDATE_PRODUCT_CATEGORY_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PRODUCT_CATEGORY_FAIL,
      payload:
        error.response && error.response.data?.message
          ? error.response.data?.message
          : error.message,
    });
  }

  setTimeout(() => {
    dispatch({ type: UPDATE_PRODUCT_CATEGORY_RESET });
  }, 4000);
};
