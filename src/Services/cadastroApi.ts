import { fetchApi } from "Utils/fetchApi";

export async function cadastroApi(userData: {
  name: string;
  email: string;
  password: string;
}) {
  const response = await fetchApi({
    method: "post",
    route: "register",
    body: userData,
    showToast: true,
  });

  return response;
}
