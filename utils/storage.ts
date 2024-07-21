import { MMKV } from "react-native-mmkv";

export const storage = new MMKV({ id: "mmkv.yaas", encryptionKey: "yaas" });

export const storageKeys = {
  ON_BOARDING_PASS: "on_boarding_pass",
};
