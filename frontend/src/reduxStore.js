import {
  userDetailsReducer,
  userListReducer,
  userPasswordUpdateReducer,
  userProfileUpdateReducer,
} from "./reducers/userReducer";
import { userLoginReducer, userRegisterReducer } from "./reducers/authReducer";

import TokenService from "./services/token.service";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

const reducer = combineReducers({
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  userProfileUpdate: userProfileUpdateReducer,
  userPasswordUpdate: userPasswordUpdateReducer,
  userList: userListReducer,
});

const initialState = {
  userLogin: { userAuthInfo: TokenService.getUser() },
};

const reduxStore = configureStore({ reducer, preloadedState: initialState });

export default reduxStore;
