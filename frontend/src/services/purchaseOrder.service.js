import {
  CONFIRM_PURCHASE_ORDER_DELIVERY_RECEIVE,
  CREATE_PURCHASE_ORDER,
  GET_ORDER_REQUEST,
  GET_ORDER_REQUEST_LIST,
  GET_PURCHASE_ORDER,
  GET_PURCHASE_ORDER_LIST,
  ORDER_RECEIVE_CONFIRM,
} from "../constants/apiLinks";
import api from "./api";

class PurchaseOrderService {
  async create(data) {
    return await api().post(CREATE_PURCHASE_ORDER, data);
  }

  async getAll() {
    return await api().get(GET_PURCHASE_ORDER_LIST);
  }

  async getList(filter, sort, pageNumber = 0, pageSize = 20) {
    return await api().get(GET_PURCHASE_ORDER_LIST, {
      params: {
        ...filter,
        ...sort,
        pageNumber,
        pageSize,
      },
    });
  }

  async get(id) {
    return await api().get(`${GET_PURCHASE_ORDER}/${id}`);
  }

  async confirmOrderReceive(data) {
    return await api().post(ORDER_RECEIVE_CONFIRM, data);
  }

  async confirmDeliveryReceive(purchaseOrderId, voucherImage) {
    const formData = new FormData();
    formData.append("purchaseOrderId", purchaseOrderId);
    formData.append("voucher", voucherImage);

    return await api("multipart/form-data").post(
      CONFIRM_PURCHASE_ORDER_DELIVERY_RECEIVE,
      formData
    );
  }

  async getOrderRequestList(filter, sort, pageNumber = 0, pageSize = 20) {
    return await api().get(GET_ORDER_REQUEST_LIST, {
      params: {
        ...filter,
        ...sort,
        pageNumber,
        pageSize,
      },
    });
  }

  async getOrderRequest(id) {
    return await api().get(`${GET_ORDER_REQUEST}/${id}`);
  }
}

export default new PurchaseOrderService();
