import {
  CREATE_PROCUREMENT,
  CREATE_PURCHASE_ORDER,
  DELETE_PROCUREMENT,
  GET_PROCUREMENT,
  GET_PROCUREMENTS,
  GET_PROCUREMENT_REQUEST_LIST,
} from "../constants/apiLinks";
import api from "./api";

class ProcurementService {
  async create(data) {
    return await api().post(CREATE_PROCUREMENT, data);
  }

  async getAll() {
    return await api().get(GET_PROCUREMENTS);
  }

  async getList(filter, sort, pageNumber = 0, pageSize = 20) {
    return await api().get(GET_PROCUREMENTS, {
      params: {
        ...filter,
        ...sort,
        pageNumber,
        pageSize,
      },
    });
  }

  async get(id) {
    return await api().get(`${GET_PROCUREMENT}/${id}`);
  }

  async delete(id) {
    return await api().delete(`${DELETE_PROCUREMENT}/${id}`);
  }

  async acceptQuotation(data) {
    return await api().post(CREATE_PURCHASE_ORDER, data);
  }

  async getProcurementRequestList(filter, sort, pageNumber = 0, pageSize = 20) {
    return await api().get(GET_PROCUREMENT_REQUEST_LIST, {
      params: {
        ...filter,
        ...sort,
        pageNumber,
        pageSize,
      },
    });
  }
}

export default new ProcurementService();
