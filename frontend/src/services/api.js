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

const instance = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

const api = (contentType = "application/json") => {
  instance.defaults.headers["Content-Type"] = contentType;

  instance.interceptors.request.use(attachToken);

  instance.interceptors.response.use((res) => res, refreshAccessToken);

  instance.interceptors.response.use((res) => res, flatenErrors);

  instance.interceptors.response.use((res) => res, logError);

  return instance;
};

const logError = (error) => {
  console.error(error.response);
  return Promise.reject(error);
};

const flatenErrors = (error) => {
  if (error.response.status === 400 && error.response.data.errors) {
    let errors = [];
    for (const key in error.response.data.errors) {
      errors = [...error.response.data.errors[key], ...errors];
    }

    error.response.data.message = errors.join(" ");
  }
  return Promise.reject(error);
};

const attachToken = (config) => {
  const token = tokenService.getLocalAccessToken();
  if (token) {
    config.headers["Authorization"] = "Bearer " + token;
  }
  return config;
};

const refreshAccessToken = async (err) => {
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
      } catch (error) {
        //Refresh token was expired
        tokenService.removeUser();

        reduxStore.dispatch({
          type: USER_LOGOUT,
        });

        return Promise.reject(error);
      }
    }
  }
  return Promise.reject(err);
};

export default api;
