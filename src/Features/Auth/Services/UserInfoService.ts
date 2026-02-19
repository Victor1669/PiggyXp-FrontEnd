import { useFetch } from "@Auth/Hooks/useFetch";

export { GetUserInfo, UpdateUserInfo };

/**
 *
 * @param userId
 * @returns
 */
async function GetUserInfo(userId: string) {
  const response = await useFetch({
    method: "get",
    rota: `userInfo/?userId=${userId}`,
  });
  return response;
}

/**
 *
 * @param userID
 * @param body
 * @param token
 * @returns
 */
async function UpdateUserInfo(userID: number, body: any, token: string) {
  const response = await useFetch({
    method: "put",
    rota: `updateUser/${userID}`,
    showToastMessage: true,
    body,
    token,
  });

  return response;
}
