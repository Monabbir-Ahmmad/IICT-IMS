import {
  DISTRIBUTE_INVENTORY,
  GET_DISTRIBUTABLE_INVENTORY,
  GET_DISTRIBUTION_HISTORY,
  GET_INVENTORY,
  GET_INVENTORY_LIST,
  GET_INVENTORY_PRODUCT,
  GET_RECEIVABLE_INVENTORY,
  GET_RECEIVE_RETURN_HISTORY,
  RECEIVE_RETURN_INVENTORY,
} from "../constants/apiLinks";
import api from "./api";

class InventoryService {
  async getAll() {
    return await api().get(GET_INVENTORY);
  }

  async get(id) {
    return await api().get(`${GET_INVENTORY_LIST}/${id}`);
  }

  async getDistributable() {
    return await api().get(GET_DISTRIBUTABLE_INVENTORY);
  }

  async getReceivable() {
    return await api().get(GET_RECEIVABLE_INVENTORY);
  }

  async distribute(data) {
    return await api().post(DISTRIBUTE_INVENTORY, data);
  }

  async receive(data) {
    return await api().post(RECEIVE_RETURN_INVENTORY, data);
  }

  async getInventoryProduct(id) {
    return await api().get(`${GET_INVENTORY_PRODUCT}/${id}`);
  }

  async getDistributionHistory() {
    return await api().get(GET_DISTRIBUTION_HISTORY);
  }

  async getReceiveReturnHistory() {
    return await api().get(GET_RECEIVE_RETURN_HISTORY);
  }
}

export default new InventoryService();
