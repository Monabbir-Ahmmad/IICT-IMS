import {
  CREATE_PRODUCT_CATEGORY,
  GET_PRODUCT_CATEGORIES,
  UPDATE_PRODUCT_CATEGORY,
} from "../constants/apiLinks";
import api from "./api";

class ProductCategoryService {
  async create(data) {
    return await api().post(CREATE_PRODUCT_CATEGORY, data);
  }

  async getAll() {
    return await api().get(GET_PRODUCT_CATEGORIES);
  }

  async update(data) {
    return await api().put(UPDATE_PRODUCT_CATEGORY, data);
  }
}

export default new ProductCategoryService();
