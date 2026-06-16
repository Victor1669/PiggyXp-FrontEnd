import { useFetch } from "@Auth/Hooks/useFetch";

export async function getTitleApi(difficulty: number, unit: number) {
  const response = await useFetch({
    method: "get",
    rota: `title?difficulty=${difficulty}&unit=${unit}`,
  });

  return response;
}

interface UpdateNivelApiReturn {
  status: number;
  data: {
    message: string;
    nivel: number;
    xpAtual: number;
    xpNecessario: number;
  };
}

export async function updateNivelApi(
  token: string,
): Promise<UpdateNivelApiReturn> {
  const response = await useFetch({
    method: "put",
    rota: `nivel`,
    token,
  });

  return response;
}
