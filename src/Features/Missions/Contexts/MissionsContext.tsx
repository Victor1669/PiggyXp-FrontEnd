import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { useAuth } from "Features/Auth/Contexts/useAuth";
import { UserMission } from "../Types/MissionsTypes";
import { SelectMissionService } from "../Services/MissionServices";
import { useGetMissions } from "../Hooks/useGetMissions";
import { StoreItem } from "Helpers/StoreItem";

interface MissionsContextData {
  missions: UserMission[];
  dailyMissions: UserMission[];
  weeklyMissions: UserMission[];
  monthlyMissions: UserMission[];
  isLoading: boolean;
  refreshMissions: () => Promise<void>;
  updateMissionDay: StoreItem;
  handleSelectMissions: () => Promise<void>;
}

interface UpdateDay {
  day: number;
  month: number;
}

const MissionsContext = createContext<MissionsContextData | undefined>(
  undefined,
);

export function MissionsProvider({ children }: { children: ReactNode }) {
  const { user, userToken, updateMissionDay } = useAuth();

  const { id } = user;

  const {
    missions,
    isLoading,
    fetchMissions,
    dailyMissions,
    weeklyMissions,
    monthlyMissions,
  } = useGetMissions(id);

  async function handleSelectMissions() {
    try {
      const token = await userToken.get();
      const { status } = await SelectMissionService({ id }, token);

      if (status < 300) {
        await fetchMissions();

        const updateDay = getActualDay();

        updateMissionDay.set(JSON.stringify(updateDay));
      }
    } catch (error) {
      console.error("Erro ao processar missão:", error);
    }
  }

  function getActualDay(): UpdateDay {
    const dateNow = new Date();

    return {
      day: dateNow.getDate(),
      month: dateNow.getMonth(),
    };
  }

  useEffect(() => {
    updateMissionDay.get().then((lastUpdateString) => {
      let lastUpdate: UpdateDay;

      if (lastUpdateString.length) {
        lastUpdate = JSON.parse(lastUpdateString);
      } else {
        handleSelectMissions();
        lastUpdate = getActualDay();
      }

      const now = getActualDay();

      if (lastUpdate.day !== now.day || lastUpdate.month !== now.month) {
        handleSelectMissions();
      }
    });
  }, []);

  const value: MissionsContextData = {
    missions,
    dailyMissions,
    weeklyMissions,
    monthlyMissions,
    isLoading,
    refreshMissions: fetchMissions,
    updateMissionDay,
    handleSelectMissions,
  };

  return (
    <MissionsContext.Provider value={value}>
      {children}
    </MissionsContext.Provider>
  );
}

export function useMissions() {
  const context = useContext(MissionsContext);
  if (context === undefined) {
    throw new Error("useMissions deve ser usado dentro de um MissionsProvider");
  }
  return context;
}
