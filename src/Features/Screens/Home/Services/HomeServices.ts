import { useFetch } from "@Auth/Hooks/useFetch";

export async function getTitleApi(difficulty: number, unit: number) {
  const response = await useFetch({
    method: "get",
    rota: `title?difficulty=${difficulty}&unit=${unit}`,
  });

  return response;
}

export async function homeApi(token: string) {
  const response = useFetch({
    method: "get",
    rota: "home",
    token,
  });

  return response;
}
