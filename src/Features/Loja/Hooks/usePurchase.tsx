import { fetchApi } from "Utils/fetchApi";

import { useStatus } from "Contexts/StatusContext";

import { useUpdateUserInfo } from "Hooks/useUpdateUserInfo";

import { toastMessage } from "Utils/toast";

export function usePurchase() {
  const { showStatus, hideStatus } = useStatus();
  const updateUserInfo = useUpdateUserInfo();

  async function purchase(productId: number) {
    showStatus("loading");

    const { status } = await purchaseApi(productId);

    if (status < 300) {
      toastMessage({ type: "success", text: "Compra realizada com sucesso!" });
    }

    await updateUserInfo();

    hideStatus();
  }

  return purchase;
}

export function purchaseApi(productId: number) {
  const response = fetchApi({
    route: "purchases/coins",
    method: "post",
    body: {
      productId,
    },
  });

  return response;
}
