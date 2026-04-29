import { useFetch } from "@Auth/Hooks/useFetch";

async function GetPhaseService(difficulty: number, order: number) {
  const response = await useFetch({
    method: "get",
    rota: `phase/?difficulty=${difficulty}&order=${order}&unit=${1}`,
  });

  return response;
}

async function FinishPhaseService(
  difficulty: number,
  order: number,
  unit: number,
  userId: number,
  token: string,
) {
  const response = await useFetch({
    method: "put",
    rota: `finish?difficulty=${difficulty}&order=${order}&unit=${unit}&id=${userId}`,
    token,
  });

  return response;
}

async function LivesService(token: string, body: { erro: number }) {
  const response = await useFetch({
    method: "put",
    rota: `live`,
    token,
    body,
  });

  console.log(response.data);

  return response;
}
export { GetPhaseService, FinishPhaseService, LivesService };
