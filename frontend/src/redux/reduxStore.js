import {
  userDetailsReducer,
  userListReducer,
  userPasswordUpdateReducer,
  userProfileUpdateReducer,
} from "./reducers/user.reducers";
import {
  userLoginReducer,
  userRegisterReducer,
} from "./reducers/auth.reducers";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import tokenService from "../services/token.service";
import {
  productCategoryCreateReducer,
  productCategoryListReducer,
  productCategoryUpdateReducer,
} from "./reducers/productCategory.reducers";

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  userProfileUpdate: userProfileUpdateReducer,
  userPasswordUpdate: userPasswordUpdateReducer,
  userList: userListReducer,
  productCategoryCreate: productCategoryCreateReducer,
  productCategoryList: productCategoryListReducer,
  productCategoryUpdate: productCategoryUpdateReducer,
});

const initialState = {
  userLogin: { userAuthInfo: tokenService.getUser() },
};

const reduxStore = configureStore({ reducer, preloadedState: initialState });

export default reduxStore;
