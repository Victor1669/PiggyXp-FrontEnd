import { useFetch } from "@Auth/Hooks/useFetch";

export async function RefreshTokenService(refreshToken: string) {
  const response = await useFetch({
    method: "post",
    rota: "refresh",
    body: { refreshToken },
  });

  return response;
}
