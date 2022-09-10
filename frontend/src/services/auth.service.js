import { POST_USER_LOGIN, POST_USER_REGISTER } from "../constants/apiLinks";
import api from "./api";
import tokenService from "./token.service";

class AuthService {
  async login(email, password) {
    const res = await api().post(POST_USER_LOGIN, { email, password });

    tokenService.setUser({
      id: res.data.id,
      name: res.data.name,
      profileImage: res.data.profileImage,
      refreshToken: res.data.refreshToken,
      accessToken: res.data.accessToken,
    });

    return res;
  }

  async register(data) {
    const res = await api("multipart/form-data").post(POST_USER_REGISTER, data);

    tokenService.setUser({
      id: res.data.id,
      name: res.data.name,
      profileImage: res.data.profileImage,
      refreshToken: res.data.refreshToken,
      accessToken: res.data.accessToken,
    });

    return res;
  }

  logout() {
    tokenService.removeUser();
  }
}

export default new AuthService();
