import { useFetch } from "@Auth/Hooks/useFetch";

export async function GetPhaseService(difficulty: number, order: number) {
  const response = await useFetch({
    method: "get",
    rota: `phase/?difficulty=${difficulty}&order=${order}&unit=${1}`,
  });

  return response;
}
