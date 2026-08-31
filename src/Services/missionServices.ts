import { fetchApi } from "Utils/fetchApi";
import { UserMission } from "../Features/Missions/Types/MissionsTypes";

interface SelectMissionValues {
  data: UserMission[];
  status: number;
}

const selectMissionApi = async () => {
  const res = await fetchApi({
    method: "put",
    route: `select`,
  });

  return res;
};

const getMissionsApi = async (id: number) => {
  const res = await fetchApi<object, SelectMissionValues>({
    method: "get",
    route: `getMission/?id=${id}`,
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

const updateMissionsApi = async (body: UpdateMissionsBody) => {
  const res = await fetchApi<UpdateMissionsBody>({
    method: "put",
    route: `update-mission`,
    body,
  });

  return res;
};

export { getMissionsApi, selectMissionApi, updateMissionsApi };
