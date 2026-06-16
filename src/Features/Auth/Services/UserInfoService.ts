import { useFetch } from "@Auth/Hooks/useFetch";

async function getUserInfoApi(userId: string) {
  const response = await useFetch({
    method: "get",
    rota: `userInfo/?userId=${userId}`,
  });
  return response;
}

async function updateUserInfoApi(userID: number, body: any, token: string) {
  const response = await useFetch({
    method: "put",
    rota: `updateUser/${userID}`,
    showToastMessage: true,
    body,
    token,
  });

  return response;
}

export { getUserInfoApi, updateUserInfoApi };
