import React, { createContext, useContext, ReactNode, useEffect } from "react";

import { SelectMissionService } from "../Services/MissionServices";

import { useAuth } from "Features/Auth/Contexts/useAuth";
import { useStorageItemsContext } from "Contexts/useStorageItemsContext";

import { useGetMissions } from "../Hooks/useGetMissions";

import { UserMission } from "../Types/MissionsTypes";
interface MissionsContextData {
  dailyMissions: UserMission[];
  weeklyMissions: UserMission[];
  monthlyMissions: UserMission[];
  isLoading: boolean;
}

interface UpdateDay {
  day: number;
  month: number;
}

const MissionsContext = createContext<MissionsContextData | undefined>(
  undefined,
);

export function MissionsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { updateMissionDay, userToken } = useStorageItemsContext();

  const { id } = user;

  const {
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
    dailyMissions,
    weeklyMissions,
    monthlyMissions,
    isLoading,
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
