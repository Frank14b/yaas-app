import * as SecureStore from "expo-secure-store";

const setItem = async (key: string, value: string) => {
  try {
    await SecureStore.setItemAsync(key, value);
    return true;
  } catch (error) {
    return false;
  }
};

const getItem = async <T>(
  key: string,
  parseJson: boolean = false
): Promise<T | undefined> => {
  try {
    const storedData = await SecureStore.getItemAsync(key);
    if (!storedData) return undefined;

    if (parseJson) return JSON.parse(storedData) as T;

    return storedData as T;
  } catch (error) {
    return undefined;
  }
};

const deleteItem = async (key: string) => {
  try {
    await SecureStore.deleteItemAsync(key);
    return true;
  } catch (error) {
    return false;
  }
};

export const storage = {
  setItem,
  getItem,
  deleteItem,
};
