import { useFetch } from "@Auth/Hooks/useFetch";

export async function GetPhaseService(difficulty: number, order: number) {
  const response = await useFetch({
    method: "get",
    rota: `phase/?difficulty=${difficulty}&order=${order + 2 * difficulty}&unit=${1}`,
  });

  return response;
}
