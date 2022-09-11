import { CREATE_QUOTATION } from "../constants/apiLinks";
import api from "./api";

class QuotationService {
  async create(data) {
    return await api().post(CREATE_QUOTATION, data);
  }
}

export default new QuotationService();
