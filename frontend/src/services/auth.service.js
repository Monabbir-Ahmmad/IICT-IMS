import {
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

    const decodedToken = tokenService.decodeToken(res.data.token);

    res.data = {
      id: decodedToken.id,
      role: decodedToken.role,
      refreshToken: res.data.token,
      accessToken: res.data.token,
    };

    tokenService.setUser(res.data);

    return res;
  }

  async register(data) {
    const res = await api().post(POST_USER_REGISTER, data);

    const decodedToken = tokenService.decodeToken(res.data.token);

    res.data = {
      id: decodedToken.id,
      role: decodedToken.role,
      refreshToken: res.data.token,
      accessToken: res.data.token,
    };

    tokenService.setUser(res.data);

    return res;
  }

  async loginSupplier(email, password) {
    const res = await api().post(POST_SUPPLIER_LOGIN, { email, password });

    const decodedToken = tokenService.decodeToken(res.data.token);

    res.data = {
      id: decodedToken.id,
      role: decodedToken.role,
      refreshToken: res.data.token,
      accessToken: res.data.token,
    };

    tokenService.setUser(res.data);

    return res;
  }

  async registerSupplier(data) {
    const res = await api().post(POST_SUPPLIER_REGISTER, data);

    const decodedToken = tokenService.decodeToken(res.data.token);

    res.data = {
      id: decodedToken.id,
      role: decodedToken.role,
      refreshToken: res.data.token,
      accessToken: res.data.token,
    };

    tokenService.setUser(res.data);

    return res;
  }

  logout() {
    tokenService.removeUser();
  }
}

export default new AuthService();
