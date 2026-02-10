import { useFetch } from "@Hooks/useFetch";

export async function DeleteUserService(id: number, token: string) {
  const response = await useFetch({
    method: "delete",
    rota: `deleteUser/${id}`,
    token,
    showToastMessage: true,
  });

  return response;
}
