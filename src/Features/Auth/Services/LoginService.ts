import { useFetch } from "@Auth/Hooks/useFetch";

export async function UserLogin(userData: { email: string; password: string }) {
  const response = await useFetch({
    method: "post",
    rota: "login",
    body: userData,
    showToastMessage: true,
  });

  return response;
}
