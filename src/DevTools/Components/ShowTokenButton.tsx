import { useStorageItemsContext } from "Contexts/useStorageItemsContext";

import Button from "Components/Button";

export default function ShowTokenButton() {
  const { userToken } = useStorageItemsContext();

  async function handleShowToken() {
    const token = await userToken.get();
    console.log(token);
  }

  return <Button onPress={handleShowToken}>Mostrar Token</Button>;
}
