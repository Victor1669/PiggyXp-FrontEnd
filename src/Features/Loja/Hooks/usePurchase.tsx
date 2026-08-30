import { purchaseApi } from "../Services/LojaServices";

import { useStatus } from "Contexts/StatusContext";

import { useUpdateUserInfo } from "Hooks/useUpdateUserInfo";
import { getStorageItem, STORAGE_KEYS } from "Utils/securestore";

import { toastMessage } from "Utils/toast";

export function usePurchase() {
  const { showStatus, hideStatus } = useStatus();
  const updateUserInfo = useUpdateUserInfo();

  async function purchase(productId: number) {
    showStatus("loading");
    const userToken = (await getStorageItem(STORAGE_KEYS.userToken)) ?? "";

    const { status } = await purchaseApi(userToken, productId);

    if (status < 300) {
      toastMessage({ type: "success", text: "Compra realizada com sucesso!" });
    }

    await updateUserInfo();

    hideStatus();
  }

  return purchase;
}
