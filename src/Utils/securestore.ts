import * as SecureStore from "expo-secure-store";
import { jwtDecode } from "jwt-decode";

export const STORAGE_KEYS = {
  recoveryEmail: "RECOVERY_EMAIL",
  temporaryImageToken: "TEMPORARY_IMAGE_TOKEN",
  updateMissionDay: "UPDATE_MISSION_DAY",
  userUnit: "USER_UNIT",
  userInfo: "USER_INFO",
  temporaryErrorCount: "TEMPORARY_ERROR_COUNT",
  userToken: "USER_TOKEN",
  refreshToken: "REFRESH_TOKEN",
} as const;

export async function getStorageItem(key: string) {
  return await SecureStore.getItemAsync(key);
}

export async function setStorageItem(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function deleteStorageItem(key: string) {
  await SecureStore.deleteItemAsync(key);
}

export async function clearStorage() {
  await Promise.all(Object.values(STORAGE_KEYS).map(deleteStorageItem));
}

export async function decodeToken<T = object>(key: string) {
  const token = await getStorageItem(key);

  if (!token) return null;

  return jwtDecode<T>(token);
}
