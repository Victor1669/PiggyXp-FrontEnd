import { useFetch } from "@Auth/Hooks/useFetch";

export async function GetUserProgress(userId: number): Promise<{
  data: {
    id: number;
    nivel: number;
    xp: number;
    coins: number;
    lives: number;
  } | null;
  status: number;
}> {
  const response = await useFetch({
    method: "get",
    rota: `progressInfo/?userId=${userId}`,
  });

  return response;
}
