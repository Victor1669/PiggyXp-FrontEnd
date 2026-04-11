import { useFetch } from "@Auth/Hooks/useFetch";

export async function TitlesService(difficulty: number, unit: number) {
  const response = await useFetch({
    method: "get",
    rota: `title?difficulty=${difficulty}&unit=${unit}`,
  });

  return response;
}
