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
import {
  procurementCreateReducer,
  procurementDeleteReducer,
  procurementListReducer,
  procurementQuotationAcceptReducer,
  procurementDetailsReducer,
} from "./reducers/procurement.reducers";
import { quotationCreateReducer } from "./reducers/quotation.reducers";
import { alertSnackbarReducer } from "./reducers/alertSnackbar.reducers";
import {
  deliverPurchaseOrderReducer,
  purchaseOrderDetailsReducer,
  purchaseOrdersReducer,
} from "./reducers/purchaseOrder.reducer";

const reducer = combineReducers({
  alertSnackbar: alertSnackbarReducer,
  userRegister: userRegisterReducer,
  userLogin: userLoginReducer,
  userDetails: userDetailsReducer,
  userProfileUpdate: userProfileUpdateReducer,
  userPasswordUpdate: userPasswordUpdateReducer,
  userList: userListReducer,
  productCategoryCreate: productCategoryCreateReducer,
  productCategoryList: productCategoryListReducer,
  productCategoryUpdate: productCategoryUpdateReducer,
  procurementCreate: procurementCreateReducer,
  procurementList: procurementListReducer,
  procurementDetails: procurementDetailsReducer,
  procurementDelete: procurementDeleteReducer,
  quotationCreate: quotationCreateReducer,
  procurementQuotationAccept: procurementQuotationAcceptReducer,
  purchaseOrders: purchaseOrdersReducer,
  purchaseOrderDetails: purchaseOrderDetailsReducer,
  deliverPurchaseOrder: deliverPurchaseOrderReducer,
});

const initialState = {
  userLogin: { userAuth: tokenService.getUser() },
};

const reduxStore = configureStore({ reducer, preloadedState: initialState });

export default reduxStore;
