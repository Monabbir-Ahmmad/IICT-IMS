import {
  DISTRIBUTE_INVENTORY_FAIL,
  DISTRIBUTE_INVENTORY_REQUEST,
  DISTRIBUTE_INVENTORY_RESET,
  DISTRIBUTE_INVENTORY_SUCCESS,
  GET_DISTRIBUTABLE_INVENTORY_LIST_FAIL,
  GET_DISTRIBUTABLE_INVENTORY_LIST_REQUEST,
  GET_DISTRIBUTABLE_INVENTORY_LIST_SUCCESS,
  GET_INVENTORY_LIST_FAIL,
  GET_INVENTORY_LIST_REQUEST,
  GET_INVENTORY_LIST_SUCCESS,
  GET_RECEIVABLE_INVENTORY_LIST_FAIL,
  GET_RECEIVABLE_INVENTORY_LIST_REQUEST,
  GET_RECEIVABLE_INVENTORY_LIST_SUCCESS,
} from "../action_types/inventory";

export const distributeInventoryReducer = (state = {}, action) => {
  switch (action.type) {
    case DISTRIBUTE_INVENTORY_REQUEST:
      return { loading: true };
    case DISTRIBUTE_INVENTORY_SUCCESS:
      return { loading: false, success: true };
    case DISTRIBUTE_INVENTORY_FAIL:
      return { loading: false, success: false, error: action.payload };
    case DISTRIBUTE_INVENTORY_RESET:
      return { loading: false, success: false };
    default:
      return state;
  }
};

export const inventoryListReducer = (state = { inventoryList: [] }, action) => {
  switch (action.type) {
    case GET_INVENTORY_LIST_REQUEST:
      return { loading: true, inventoryList: [] };
    case GET_INVENTORY_LIST_SUCCESS:
      return { loading: false, inventoryList: action.payload };
    case GET_INVENTORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const distributableInventoryListReducer = (
  state = { inventoryList: [] },
  action
) => {
  switch (action.type) {
    case GET_DISTRIBUTABLE_INVENTORY_LIST_REQUEST:
      return { loading: true, inventoryList: [] };
    case GET_DISTRIBUTABLE_INVENTORY_LIST_SUCCESS:
      return { loading: false, inventoryList: action.payload };
    case GET_DISTRIBUTABLE_INVENTORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const receivableInventoryListReducer = (
  state = { inventoryList: [] },
  action
) => {
  switch (action.type) {
    case GET_RECEIVABLE_INVENTORY_LIST_REQUEST:
      return { loading: true, inventoryList: [] };
    case GET_RECEIVABLE_INVENTORY_LIST_SUCCESS:
      return { loading: false, inventoryList: action.payload };
    case GET_RECEIVABLE_INVENTORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
