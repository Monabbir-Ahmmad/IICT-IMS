import {
  GET_AUTO_COMPLETE_PRODUCT_CATEGORIES,
  GET_AUTO_COMPLETE_USER_ROLES,
} from "../constants/apiLinks";
import api from "./api";

class AutoCompleteService {
  async getProductCategories() {
    return await api().get(GET_AUTO_COMPLETE_PRODUCT_CATEGORIES);
  }

  async getUserRoles() {
    return await api().get(GET_AUTO_COMPLETE_USER_ROLES);
  }
}

export default new AutoCompleteService();
