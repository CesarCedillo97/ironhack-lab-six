import { getCredentials, SecureStorageKeys } from "../utils/secureSorage";
import securedApi from "./ApiService";
import { ApiResponse, Post } from "./types";

const getUserPosts = async (): Promise<ApiResponse<Post[]>> => {
  try {
    const userId = await getCredentials(SecureStorageKeys.USER_ID); //Esto tampoco se debe hacer, sigo simulando como que el id del usuario se guarda en el JWT y se manda desde el interceptor
    const response = await securedApi.get(`/posts?author=${userId}`);
    if (!response.data) {
      return { success: false, errorMessage: "Error fetching posts" };
    }
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, errorMessage: "Error fetching posts" };
  }
};

export default getUserPosts;
