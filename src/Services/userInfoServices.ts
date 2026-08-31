import { UserType } from "Features/Auth/Types/UserType";
import { fetchApi } from "Utils/fetchApi";

async function getUserInfoApi(userId: string) {
  const response = await fetchApi<object, UserType>({
    method: "get",
    route: `userInfo/?userId=${userId}`,
  });
  return response;
}

async function updateUserInfoApi(userID: number, body: any) {
  const response = await fetchApi({
    method: "put",
    route: `updateUser/${userID}`,
    showToast: true,
    body,
  });

  return response;
}

export { getUserInfoApi, updateUserInfoApi };
