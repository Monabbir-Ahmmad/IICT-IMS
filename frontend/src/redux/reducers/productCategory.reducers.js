import {
  CREATE_PRODUCT_CATEGORY_FAIL,
  CREATE_PRODUCT_CATEGORY_REQUEST,
  CREATE_PRODUCT_CATEGORY_RESET,
  CREATE_PRODUCT_CATEGORY_SUCCESS,
  GET_PRODUCT_CATEGORY_LIST_FAIL,
  GET_PRODUCT_CATEGORY_LIST_REQUEST,
  GET_PRODUCT_CATEGORY_LIST_SUCCESS,
  UPDATE_PRODUCT_CATEGORY_FAIL,
  UPDATE_PRODUCT_CATEGORY_REQUEST,
  UPDATE_PRODUCT_CATEGORY_RESET,
  UPDATE_PRODUCT_CATEGORY_SUCCESS,
} from "../action_types/productCategory";

export const productCategoryCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_PRODUCT_CATEGORY_REQUEST:
      return { loading: true };
    case CREATE_PRODUCT_CATEGORY_SUCCESS:
      return { loading: false, success: true };
    case CREATE_PRODUCT_CATEGORY_FAIL:
      return { loading: false, success: false, error: action.payload };
    case CREATE_PRODUCT_CATEGORY_RESET:
      return { loading: false, success: false };
    default:
      return state;
  }
};

export const productCategoryListReducer = (
  state = { productCategories: [] },
  action
) => {
  switch (action.type) {
    case GET_PRODUCT_CATEGORY_LIST_REQUEST:
      return { loading: true, productCategories: [] };
    case GET_PRODUCT_CATEGORY_LIST_SUCCESS:
      return { loading: false, productCategories: action.payload };
    case GET_PRODUCT_CATEGORY_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCategoryUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PRODUCT_CATEGORY_REQUEST:
      return { loading: true };
    case UPDATE_PRODUCT_CATEGORY_SUCCESS:
      return { loading: false, success: true };
    case UPDATE_PRODUCT_CATEGORY_FAIL:
      return { loading: false, success: false, error: action.payload };
    case UPDATE_PRODUCT_CATEGORY_RESET:
      return { loading: false, success: false };
    default:
      return state;
  }
};
