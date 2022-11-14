import {
  CREATE_QUOTATION,
  GET_PROCUREMENT_REQUEST_LIST,
} from "../constants/apiLinks";
import api from "./api";

class QuotationService {
  async create(data) {
    return await api().post(CREATE_QUOTATION, data);
  }

  async getProcurmentRequestList() {
    return await api().get(GET_PROCUREMENT_REQUEST_LIST);
  }
}

export default new QuotationService();
