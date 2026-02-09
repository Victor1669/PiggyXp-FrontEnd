import { useFetch } from "@Hooks/useFetch";

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

/**
 *
 * @param body
 * @returns
 */
export async function ResetPassword(body: {
  code: number;
  newPassword: string;
  confirmPassword: string;
}) {
  const response = await useFetch({
    method: "post",
    rota: "recovery",
    body,
    showToastMessage: true,
  });

  return response;
}
