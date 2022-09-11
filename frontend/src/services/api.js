import {
  API_URL,
  POST_REFRESH_TOKEN,
  POST_USER_LOGIN,
  POST_USER_REGISTER,
} from "../constants/apiLinks";
import tokenService from "./token.service";
import { USER_LOGOUT } from "../redux/action_types/auth";
import axios from "axios";
import reduxStore from "../redux/reduxStore";

const publicUrls = [POST_USER_LOGIN, POST_USER_REGISTER, POST_REFRESH_TOKEN];

const api = (contentType = "application/json") => {
  const instance = axios.create({
    baseURL: `${API_URL}/api`,
    headers: {
      "Content-Type": contentType,
    },
  });

  instance.interceptors.request.use(
    (config) => {
      const token = tokenService.getLocalAccessToken();
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    (res) => res,
    async (err) => {
      const originalConfig = err.config;
      if (!publicUrls.includes(originalConfig.url) && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            const rs = await instance.post(POST_REFRESH_TOKEN, {
              refreshToken: tokenService.getLocalRefreshToken(),
            });
            const { accessToken } = rs.data;

            tokenService.updateLocalAccessToken(accessToken);

            return instance(originalConfig);
          } catch (_error) {
            //Refresh token was expired
            tokenService.removeUser();

            reduxStore.dispatch({
              type: USER_LOGOUT,
            });

            return Promise.reject(_error);
          }
        }
      }
      return Promise.reject(err);
    }
  );

  return instance;
};

export default api;
