import { purchaseApi } from "../Services/LojaServices";

import { useStatus } from "Contexts/StatusContext";
import { useStorageItemsContext } from "Contexts/useStorageItemsContext";

import { useUpdateUserInfo } from "Hooks/useUpdateUserInfo";

import { toastMessage } from "Utils/toast";

export function usePurchase() {
  const { userToken } = useStorageItemsContext();
  const { showStatus, hideStatus } = useStatus();
  const updateUserInfo = useUpdateUserInfo();

  async function purchase(productId: number) {
    showStatus("loading");
    const token = await userToken.get();
    const { status } = await purchaseApi(token, productId);

    if (status < 300) {
      toastMessage({ type: "success", text: "Compra realizada com sucesso!" });
    }

    updateUserInfo();

    hideStatus();
  }

  return purchase;
}
