import {
  CREATE_PROCUREMENT,
  DELETE_PROCUREMENT,
  GET_PROCUREMENT,
  GET_PROCUREMENTS,
} from "../constants/apiLinks";
import api from "./api";

class ProcurementService {
  async create(data) {
    return await api().post(CREATE_PROCUREMENT, data);
  }

  async getAll() {
    return await api().get(GET_PROCUREMENTS);
  }

  async get(id) {
    return await api().get(`${GET_PROCUREMENT}/${id}`);
  }

  async delete(id) {
    return await api().delete(`${DELETE_PROCUREMENT}/${id}`);
  }
}

export default new ProcurementService();
