import { MMKV } from "react-native-mmkv";

export const storage = new MMKV({ id: "mmkv.yaas", encryptionKey: "yaas" });

export const storageKeys = {
  AUTH_TOKEN: "authToken",
};
