import { useFetch } from "@Auth/Hooks/useFetch";

export async function DifficultyService(
  body: { difficulty: number },
  token: string,
) {
  const response = await useFetch({
    method: "post",
    rota: "difficulty",
    body,
    token,
    showToastMessage: true,
  });

  return response;
}
