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
    return await api().get(GET_INVENTORY_LIST);
  }

  async getList(filter, sort, pageNumber = 0, pageSize = 20) {
    return await api().get(GET_INVENTORY_LIST, {
      params: {
        ...filter,
        ...sort,
        pageNumber,
        pageSize,
      },
    });
  }

  async get(id) {
    return await api().get(`${GET_INVENTORY}/${id}`);
  }

  async getDistributable(filter, sort, pageNumber = 0, pageSize = 20) {
    return await api().get(GET_DISTRIBUTABLE_INVENTORY, {
      params: {
        ...filter,
        ...sort,
        pageNumber,
        pageSize,
      },
    });
  }

  async getReceivable(filter, sort, pageNumber = 0, pageSize = 20) {
    return await api().get(GET_RECEIVABLE_INVENTORY, {
      params: {
        ...filter,
        ...sort,
        pageNumber,
        pageSize,
      },
    });
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

  async getDistributionHistory(filter, sort, pageNumber = 0, pageSize = 20) {
    return await api().get(GET_DISTRIBUTION_HISTORY, {
      params: {
        ...filter,
        ...sort,
        pageNumber,
        pageSize,
      },
    });
  }

  async getReceiveReturnHistory(filter, sort, pageNumber = 0, pageSize = 20) {
    return await api().get(GET_RECEIVE_RETURN_HISTORY, {
      params: {
        ...filter,
        ...sort,
        pageNumber,
        pageSize,
      },
    });
  }
}

export default new InventoryService();
