import { fetchApi } from "Utils/fetchApi";
import { UserType } from "Features/Auth/Types/UserType";

export async function getTitleApi(difficulty: number, unit: number) {
  const response = await fetchApi<object, { tittle: string }>({
    method: "get",
    route: `title?difficulty=${difficulty}&unit=${unit}`,
  });

  return response;
}

export async function homeApi() {
  const response = await fetchApi<
    object,
    UserType & { newAchievements: string }
  >({
    method: "get",
    route: "home",
  });

  return response;
}
