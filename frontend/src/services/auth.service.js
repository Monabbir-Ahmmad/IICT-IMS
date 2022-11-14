import {
  POST_LOGOUT,
  POST_SUPPLIER_LOGIN,
  POST_SUPPLIER_REGISTER,
  POST_USER_LOGIN,
  POST_USER_REGISTER,
} from "../constants/apiLinks";
import api from "./api";
import tokenService from "./token.service";

class AuthService {
  async login(email, password) {
    const res = await api().post(POST_USER_LOGIN, { email, password });

    const decodedToken = tokenService.decodeToken(res.data.accessToken);

    res.data = {
      id: decodedToken.id,
      role: decodedToken.role,
      refreshToken: res.data.refreshToken,
      accessToken: res.data.accessToken,
    };

    tokenService.setUser(res.data);

    return res;
  }

  async register(data) {
    return await api().post(POST_USER_REGISTER, data);
  }

  async loginSupplier(email, password) {
    const res = await api().post(POST_SUPPLIER_LOGIN, { email, password });

    const decodedToken = tokenService.decodeToken(res.data.accessToken);

    res.data = {
      id: decodedToken.id,
      role: decodedToken.role,
      refreshToken: res.data.refreshToken,
      accessToken: res.data.accessToken,
    };

    tokenService.setUser(res.data);

    return res;
  }

  async registerSupplier(data) {
    return await api().post(POST_SUPPLIER_REGISTER, data);
  }

  async logout() {
    await api().post(POST_LOGOUT);
    tokenService.removeUser();
  }
}

export default new AuthService();
