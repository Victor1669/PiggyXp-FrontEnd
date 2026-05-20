import { useState, useEffect, useCallback } from "react";
import { GetMissionsService } from "../Services/MissionServices";
import { UserMission, MissionFrequency } from "../Types/MissionsTypes";

export function useGetMissions(userId: number) {
  const [missions, setMissions] = useState<UserMission[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMissions = useCallback(async () => {
    if (!userId) return;

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

  const filterByFrequency = (frequency: MissionFrequency) =>
    missions.filter((m) => m.mission.frequency === frequency);

  return {
    missions,
    isLoading,
    fetchMissions,
    dailyMissions: filterByFrequency("daily"),
    weeklyMissions: filterByFrequency("weekly"),
    monthlyMissions: filterByFrequency("monthly"),
  };
}
