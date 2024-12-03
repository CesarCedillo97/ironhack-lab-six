import AsyncStorage from "@react-native-async-storage/async-storage";

enum StorageKeys {
  USER = "user",
  USER_ID = "userId",
}

const storeData = async <T>(key: StorageKeys, value: T) => {
  try {
    const stringifyedValue = JSON.stringify(value);
    if (!stringifyedValue) {
      return false;
    }
    await AsyncStorage.setItem(key, stringifyedValue);
    return true;
  } catch (e) {
    console.error("Error storing data", e);
    return false;
  }
};

const getData = async <T>(key: StorageKeys): Promise<T | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value ? (value as T) : null;
  } catch (e) {
    console.error("Error fetching data", e);
    return null;
  }
};

export { storeData, getData, StorageKeys };
