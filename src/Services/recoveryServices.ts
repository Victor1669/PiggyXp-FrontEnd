import { fetchApi } from "Utils/fetchApi";

export async function sendRecoveryEmailApi(body: { email: string }) {
  const response = await fetchApi({
    method: "post",
    route: "recovery",
    body,
    showToast: true,
  });

  return response;
}

export async function resetPasswordApi(body: {
  code: string;
  newPassword: string;
  confirmPassword: string;
}) {
  const response = await fetchApi({
    method: "post",
    route: "reset",
    body,
    showToast: true,
  });

  return response;
}
