import { fetchApi } from "Utils/fetchApi";

async function getPhaseApi(difficulty: number, order: number) {
  const response = await fetchApi({
    method: "get",
    route: `phase/?difficulty=${difficulty}&order=${order}&unit=${1}`,
  });

  return response;
}

async function finishPhaseApi(
  difficulty: number,
  order: number,
  unit: number,
  userId: number,
) {
  const response = await fetchApi({
    method: "put",
    route: `finish?difficulty=${difficulty}&order=${order}&unit=${unit}&id=${userId}`,
  });

  return response;
}

async function livesApi(body: { erro: number }) {
  const response = await fetchApi({
    method: "put",
    route: `live`,
    body,
  });

  return response;
}

export { getPhaseApi, finishPhaseApi, livesApi };
