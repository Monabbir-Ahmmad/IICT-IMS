import {
  CREATE_QUOTATION,
  GET_PROCUREMENT_REQUEST_LIST,
} from "../constants/apiLinks";
import api from "./api";

class QuotationService {
  async create(data) {
    return await api().post(CREATE_QUOTATION, data);
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

export default new QuotationService();
