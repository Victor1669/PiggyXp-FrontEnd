import { useFetch } from "@Auth/Hooks/useFetch";

export async function UserRegister(userData: {
  name: string;
  email: string;
  password: string;
}) {
  const response = await useFetch({
    method: "post",
    rota: "register",
    body: userData,
    showToastMessage: true,
  });

  return response;
}
