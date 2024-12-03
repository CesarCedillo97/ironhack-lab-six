import axios from "axios";
import { localHost } from "./ApiService";
import { ApiResponse, User } from "./types";
import { saveCredentials, SecureStorageKeys } from "../utils/secureSorage";
import { StorageKeys, storeData } from "../utils/storage";

export const login = async (
  username: string,
  password: string
): Promise<ApiResponse<string>> => {
  try {
    if (!username || !password) {
      return {
        success: false,
        errorMessage: "Username and password are required",
      };
    }
    console.log("Connecting to:", localHost);
    const url = `${localHost}/users`;
    console.log("URL:", url);

    const response = await axios.get(
      `${url}?username=${username}&password=${password}`
    );

    if (response.data.length > 0) {
      const user: User = response.data[0];
      if (user) {
        console.log("Token recibido:", user.token);
        const saveUserCredentials = await saveCredentials(
          SecureStorageKeys.TOKEN,
          user.token
        );
        const saveUserId = await saveCredentials(
          SecureStorageKeys.USER_ID,
          user.id.toString()
        ); //Esto no se debe hacer, lo hago solo para simular el manejo de un id de usuario desde JWT
        const saveUserData = await storeData(StorageKeys.USER, {
          profle: user.profile,
        });
        if (!saveUserCredentials || !saveUserData || !saveUserId) {
          console.log("saveUserCredentials:", saveUserCredentials);
          console.log("saveUserData:", saveUserData);
          console.log("saveUserId:", saveUserId);
          return {
            success: false,
            errorMessage: "Error saving user data",
          };
        }
        return { success: true };
      }
    }

    return { success: false, errorMessage: "Invalid username or password" };
  } catch (error) {
    console.error("Error en el login:", error);
    return {
      success: false,
      errorMessage: "Login failed - " + (error as Error).message,
    };
  }
};

export const logout = async () => {
  try {
    // Aquí puedes limpiar AsyncStorage, Keychain o cualquier almacenamiento local
    console.log("Logging out...");
    return { success: true };
  } catch (error) {
    return {
      success: false,
      errorMessage: "Logout failed - " + (error as Error).message,
    };
  }
};
