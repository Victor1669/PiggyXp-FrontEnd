import { useFetch } from "@Hooks/useFetch";

export async function UserRegister(userData: any) {
  const response = await useFetch({
    method: "post",
    rota: "register",
    body: userData,
    showToastMessage: true,
  });

  return response;
}
