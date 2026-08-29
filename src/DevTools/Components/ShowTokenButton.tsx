import { getStorageItem, STORAGE_KEYS } from "Utils/securestore";

import Button from "Components/Button";

export default function ShowTokenButton() {
  async function handleShowToken() {
    const token = await getStorageItem(STORAGE_KEYS.userToken);
    console.log(token);
  }

  return <Button onPress={handleShowToken}>Mostrar Token</Button>;
}
