import {
  GET_SUPPLIER_PROFILE,
  GET_USER_PROFILE,
  UPDATE_SUPPLIER_PROFILE,
  UPDATE_USER_PASSWORD,
  UPDATE_USER_PROFILE,
} from "../constants/apiLinks";
import api from "./api";

class UserService {
  async getUserProfile(id) {
    return await api().get(GET_USER_PROFILE + `/${id}`);
  }

  async getSupplierProfile(id) {
    return await api().get(GET_SUPPLIER_PROFILE + `/${id}`);
  }

  async updatePassword(data) {
    return await api().put(UPDATE_USER_PASSWORD, data);
  }

  async updateUserProfile(data) {
    return await api().put(UPDATE_USER_PROFILE, data);
  }

  async updateSupplierProfile(data) {
    return await api().put(UPDATE_SUPPLIER_PROFILE, data);
  }
}

export default new UserService();
