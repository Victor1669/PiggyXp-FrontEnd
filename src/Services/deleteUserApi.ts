import { fetchApi } from "Utils/fetchApi";

export async function deleteUserApi(id: number) {
  const response = await fetchApi({
    method: "delete",
    route: `deleteUser/${id}`,
    showToast: true,
  });

  return response;
}
