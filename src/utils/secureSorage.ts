import { setItemAsync, getItemAsync } from "expo-secure-store";

enum SecureStorageKeys {
  TOKEN = "token",
  USER_ID = "userId",
}

const saveCredentials = async <T>(
  key: SecureStorageKeys,
  value: T
): Promise<boolean> => {
  try {
    const stringifyedValue = JSON.stringify(value);
    if (!stringifyedValue) {
      return false;
    }
    await setItemAsync(key, stringifyedValue);
    return true;
  } catch (error) {
    console.log("Error storing data", error);
    return false;
  }
};

const getCredentials = async (
  key: SecureStorageKeys
): Promise<string | null> => {
  try {
    const result = await getItemAsync(key);
    return result ? JSON.parse(result) : null;
  } catch (error) {
    console.log("Error fetching data", error);
    return null;
  }
};

const clearCredentials = async () => {
  for (const key in SecureStorageKeys) {
    await setItemAsync(key, "");
  }
};

export { saveCredentials, getCredentials, SecureStorageKeys };
