import { useFetch } from "@Hooks/useFetch";

export async function UserLogin(userData: any) {
  const response = await useFetch({
    method: "post",
    rota: "login",
    body: userData,
    showToastMessage: true,
  });

  return response;
}
