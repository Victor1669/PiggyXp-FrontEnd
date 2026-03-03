import { useFetch } from "@Auth/Hooks/useFetch";

export async function GetUserProgress(userId: number) {
  const response = await useFetch({
    method: "get",
    rota: `progressInfo/?progressId=${userId}`,
  });

  return response;
}
