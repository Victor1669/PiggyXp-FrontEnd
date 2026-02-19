import { jwtDecode } from "jwt-decode";

import {
  deleteSecureStoreItem,
  getSecureStoreItem,
  setSecureStoreItem,
} from "Utils/securestore";

export class StoreItem {
  itemName: string;

  constructor(itemName: string) {
    this.itemName = itemName;
  }
  async get() {
    return await getSecureStoreItem({ itemName: this.itemName });
  }
  async set(newItemValue: string) {
    await setSecureStoreItem({
      itemName: this.itemName,
      newValue: newItemValue,
    });
  }
  async delete() {
    await deleteSecureStoreItem({ itemName: this.itemName });
  }
}

export class JWTStoreItem extends StoreItem {
  constructor(itemName: string) {
    super(itemName);
  }
  async decode() {
    return jwtDecode(await this.get());
  }
}
