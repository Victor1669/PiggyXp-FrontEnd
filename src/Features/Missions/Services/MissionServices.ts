import { useFetch } from "Features/Auth/Hooks/useFetch";
import { UserMission } from "../Types/MissionsTypes";

interface SelectMissionValues {
  data: UserMission[];
  status: number;
}

const SelectMissionService = async (
  body: {
    id: number;
  },
  token: string,
) => {
  const res = await useFetch({
    method: "put",
    rota: `select`,
    token,
    body,
  });

  return res;
};

const GetMissionsService = async (id: number): Promise<SelectMissionValues> => {
  const res = await useFetch({
    method: "get",
    rota: `getMission/?id=${id}`,
  });

  return res;
};

interface UpdateMissionsBody {
  erro: number;
  acerts: number;
  streak: number;
  completePhase: boolean;
  completeUnit: boolean;
  login: number;
}

const UpdateMissionsService = async (
  body: UpdateMissionsBody,
  token: string,
) => {
  const res = await useFetch({
    method: "put",
    rota: `update-mission`,
    body,
    token,
  });

  return res;
};

export { GetMissionsService, SelectMissionService, UpdateMissionsService };
