import { useFetch } from "@Hooks/useFetch";

export async function DeleteUserService(id: number) {
  const response = await useFetch({
    method: "delete",
    rota: `/delete-user/${id}`,
  });

  return response;
}
