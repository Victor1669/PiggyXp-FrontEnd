import { fetchApi } from "Utils/fetchApi";

export async function refreshTokenApi(refreshToken: string) {
  const response = await fetchApi<object, { accessToken: string }>({
    method: "post",
    route: "refresh",
    body: { refreshToken },
  });

  return response;
}
