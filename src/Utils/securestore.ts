import * as SecureStore from "expo-secure-store";

export { getSecureStoreItem, setSecureStoreItem, deleteSecureStoreItem };

interface SecureStoreItemTypes {
  itemName: string;
}

interface setSecureStoreItemTypes extends SecureStoreItemTypes {
  newValue: string;
}

async function getSecureStoreItem({ itemName }: SecureStoreItemTypes) {
  return (await SecureStore.getItemAsync(itemName)) ?? "";
}

async function setSecureStoreItem({
  itemName,
  newValue,
}: setSecureStoreItemTypes) {
  await SecureStore.setItemAsync(itemName, newValue);
}

async function deleteSecureStoreItem({ itemName }: SecureStoreItemTypes) {
  await SecureStore.deleteItemAsync(itemName);
}
