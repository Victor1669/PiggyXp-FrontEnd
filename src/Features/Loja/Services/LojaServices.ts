import { useFetch } from "Features/Auth/Hooks/useFetch";

export function purchaseApi(token: string, productId: number) {
  const response = useFetch({
    rota: "purchases/coins",
    method: "post",
    token,
    body: {
      productId,
    },
  });

  return response;
}
