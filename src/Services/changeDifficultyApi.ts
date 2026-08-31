import { fetchApi } from "Utils/fetchApi";

interface ChangeDifficultyApiBody {
  difficulty: number;
}

export async function changeDifficultyApi(body: ChangeDifficultyApiBody) {
  const response = await fetchApi<ChangeDifficultyApiBody>({
    method: "post",
    route: "difficulty",
    body,
  });

  return response;
}
