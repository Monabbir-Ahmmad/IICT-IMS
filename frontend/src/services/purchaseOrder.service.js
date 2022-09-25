import {
  CONFIRM_PURCHASE_ORDER_DELIVERY_RECEIVE,
  CREATE_PURCHASE_ORDER,
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
}

export default new PurchaseOrderService();
