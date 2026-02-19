import { useFetch } from "@Auth/Hooks/useFetch";

/**
 *
 * @param body
 * @returns
 */
export async function SendRecoveryEmail(body: { email: string }) {
  const response = await useFetch({
    method: "post",
    rota: "recovery",
    body,
    showToastMessage: true,
  });

  return response;
}

export async function resendRecoveryEmail(body: { email: string }) {
  const response = await useFetch({
    method: "post",
    rota: "recovery",
    body,
    showToastMessage: true,
  });

  return response;
}

/**
 *
 * @param body
 * @returns
 */
export async function ResetPassword(body: {
  code: string;
  newPassword: string;
  confirmPassword: string;
}) {
  const response = await useFetch({
    method: "post",
    rota: "reset",
    body,
    showToastMessage: true,
  });

  return response;
}
