import { useState, useEffect, useCallback, useMemo } from "react";

import { screenValues } from "Config/screenValues";

import { GetMissionsService } from "../Services/MissionServices";

import { useInternetConnection } from "Contexts/useInternetConnection";

import { UserMission } from "../Types/MissionsTypes";

import { PreviewMissions } from "Features/Preview/PreviewMission";

export function useGetMissions(userId: number) {
  const [missions, setMissions] = useState<UserMission[]>(PreviewMissions);
  const [isLoading, setIsLoading] = useState(true);

  const { getIsConnected } = useInternetConnection();
  const { isPreviewBuild } = screenValues();

  const fetchMissions = useCallback(async () => {
    if (!userId || isPreviewBuild || !getIsConnected()) return;

    setIsLoading(true);
    try {
      const { data, status } = await GetMissionsService(userId);

      if (status < 300) {
        setMissions(data);
      }
    } catch (error) {
      console.error("Erro ao carregar missões:", error);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchMissions();
  }, [fetchMissions]);

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
    missions,
    isLoading,
    fetchMissions,
    dailyMissions,
    weeklyMissions,
    monthlyMissions,
  };
}
