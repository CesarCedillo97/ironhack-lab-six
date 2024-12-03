import axios from "axios";
import { getCredentials, SecureStorageKeys } from "../utils/secureSorage";

export const localHost = "http://10.0.2.2:3000";

const securedApi = axios.create({
  baseURL: localHost,
  timeout: 1000,
});

securedApi.interceptors.request.use(
  async (config) => {
    const token = await getCredentials(SecureStorageKeys.TOKEN);
    if (!token) {
      return Promise.reject("Token not found");
    }
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default securedApi;
