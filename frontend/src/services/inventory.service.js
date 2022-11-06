import {
  DISTRIBUTE_INVENTORY,
  GET_DISTRIBUTABLE_INVENTORY,
  GET_INVENTORY,
  GET_INVENTORY_LIST,
  GET_INVENTORY_PRODUCT,
  GET_RECEIVABLE_INVENTORY,
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

  async getInventoryProduct(id) {
    return await api().get(`${GET_INVENTORY_PRODUCT}/${id}`);
  }
}

export default new InventoryService();
