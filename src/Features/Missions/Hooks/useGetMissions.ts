import { useState, useCallback, useMemo } from "react";
import { usePathname } from "expo-router";

import { screenValues } from "Config/screenValues";

import { GetMissionsService } from "../Services/MissionServices";

import { useInternetConnection } from "Contexts/useInternetConnection";

import { UserMission } from "../Types/MissionsTypes";

export function useGetMissions(userId: number) {
  const [missions, setMissions] = useState<UserMission[]>([]);

  const { getIsConnected } = useInternetConnection();

  const pathname = usePathname();

  const { isPreviewBuild } = screenValues();

  const fetchMissions = useCallback(async () => {
    if (pathname !== "/Content/Missions") return;

    if (!userId || isPreviewBuild || !getIsConnected()) return;

    try {
      const { data, status } = await GetMissionsService(userId);

      if (status < 300) {
        setMissions(data);
      }
    } catch (error) {
      console.error("Erro ao carregar missões:", error);
    }
  }, [userId, pathname]);

  const dailyMissions = useMemo(
    () => missions.filter((m) => m.mission.frequency === "daily"),
    [missions],
  );

  const weeklyMissions = useMemo(
    () => missions.filter((m) => m.mission.frequency === "weekly"),
    [missions],
  );

  const monthlyMissions = useMemo(
    () => missions.filter((m) => m.mission.frequency === "monthly"),
    [missions],
  );

  return {
    fetchMissions,
    dailyMissions,
    weeklyMissions,
    monthlyMissions,
  };
}
