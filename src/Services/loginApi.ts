import { fetchApi } from "Utils/fetchApi";

export interface LoginApiResponse {
  message: string;
  refreshToken: string;
  token: string;
}

export async function loginApi(userData: { email: string; password: string }) {
  const response = await fetchApi<object, LoginApiResponse>({
    method: "post",
    route: "login",
    body: userData,
    showToast: true,
  });

  return response;
}
