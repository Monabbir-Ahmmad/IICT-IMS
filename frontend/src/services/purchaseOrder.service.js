import {
  CONFIRM_PURCHASE_ORDER_DELIVERY_RECEIVE,
  CREATE_PURCHASE_ORDER,
  GET_ORDER_REQUEST_LIST,
  GET_PURCHASE_ORDER,
  GET_PURCHASE_ORDER_LIST,
  SEND_PURCHASE_ORDER_DELIVERY,
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

  async sendDelivery(data) {
    return await api().post(SEND_PURCHASE_ORDER_DELIVERY, data);
  }

  async confirmDeliveryReceive(purchaseOrderId) {
    return await api().post(CONFIRM_PURCHASE_ORDER_DELIVERY_RECEIVE, {
      purchaseOrderId,
    });
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
}

export default new PurchaseOrderService();
