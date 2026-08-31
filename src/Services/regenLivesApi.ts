import { fetchApi } from "../Utils/fetchApi";

export async function regenLivesApi() {
  const response = await fetchApi({
    method: "put",
    route: `regen`,
    logError: false,
  });

  return response;
}
