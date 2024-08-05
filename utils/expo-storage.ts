// import * as SecureStore from "expo-secure-store";
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { logger } from "./logger";

const setItem = async (key: string, value: string) => {
  try {
    // await SecureStore.setItemAsync(key, value);
    await useAsyncStorage(key).setItem(value);
    return true;
  } catch (error) {
    logger.Error(error);
    return false;
  }
};

const getItem = async <T>(
  key: string,
  parseJson: boolean = false
): Promise<T | undefined> => {
  try {
    // const storedData = await SecureStore.getItemAsync(key);
    const storedData = await useAsyncStorage(key).getItem();

    if (!storedData) return undefined;

    if (parseJson) return JSON.parse(storedData) as T;

    return storedData as T;
  } catch (error) {
    logger.Error(error);
    return undefined;
  }
};

const deleteItem = async (key: string) => {
  try {
    // await SecureStore.deleteItemAsync(key);
    await useAsyncStorage(key).removeItem()

    return true;
  } catch (error) {
    logger.Error(error);
    return false;
  }
};

export const storage = {
  setItem,
  getItem,
  deleteItem,
};
