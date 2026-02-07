import { useFetch } from "../../../../Hooks/useFetch";

export { UserLogin };

async function UserLogin(userData: any) {
  const response = await useFetch({
    method: "post",
    rota: "api/login",
    body: userData,
  });

  return response;
}
