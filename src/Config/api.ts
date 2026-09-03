import axios from "axios";
import { fetch } from "@react-native-community/netinfo";

import { env } from "Config/env";
import {
  STORAGE_KEYS,
  getStorageItem,
  deleteStorageItem,
} from "@Utils/securestore";
import { toastMessage } from "Utils/toast";
import { AppConfig } from "./appConfig";

declare module "axios" {
  export interface AxiosRequestConfig {
    showToast?: boolean;
    route?: string;
  }
}

export const api = axios.create({
  baseURL: env.backEndUrl + "/api/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const netInfo = await fetch();
  const isConnected =
    netInfo.isConnected === true && netInfo.isInternetReachable !== false;

  if (!isConnected) {
    return Promise.reject(new Error("Conecte-se à Internet para continuar!"));
  }

  if (AppConfig.isPreviewBuild) {
    const controller = new AbortController();
    config.signal = controller.signal;
    controller.abort();
    return config;
  }

  const token = await getStorageItem(STORAGE_KEYS.userToken);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    if (response.config.showToast !== false) {
      toastMessage({ type: "success", text: response.data.message });
    }
    return response;
  },
  async (error) => {
    const errObj = error.response?.data;
    const errMessage =
      errObj?.message || errObj?.error || error.message || "Erro inesperado";

    if (error.config?.showToast !== false) {
      toastMessage({ type: "error", text: errMessage });
    }

    const status = error.response?.status;
    if (status === 401 || status === 403) {
      await Promise.all([
        deleteStorageItem(STORAGE_KEYS.refreshToken),
        deleteStorageItem(STORAGE_KEYS.userToken),
      ]);
    }
    return Promise.reject(error);
  },
);
