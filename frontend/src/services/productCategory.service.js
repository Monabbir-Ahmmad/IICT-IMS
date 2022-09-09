import {
  CREATE_PRODUCT_CATEGORY,
  GET_PRODUCT_CATEGORIES,
  UPDATE_PRODUCT_CATEGORY,
} from "../constants/apiLinks";
import api from "./api";

class ProductCategoryService {
  async create(name) {
    return await api().post(CREATE_PRODUCT_CATEGORY, { name });
  }

  async getAll() {
    return await api().get(GET_PRODUCT_CATEGORIES);
  }

  async update(id, name) {
    return await api().put(UPDATE_PRODUCT_CATEGORY, { id, name });
  }
}

export default new ProductCategoryService();
