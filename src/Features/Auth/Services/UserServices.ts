import { useFetch } from "../../../Hooks/useFetch";

export { GetUserInfo };

async function GetUserInfo(userId: string) {
  const response = await useFetch({
    method: "get",
    rota: `api/userInfo/?userId=${userId}`,
  });
  return response;
}
