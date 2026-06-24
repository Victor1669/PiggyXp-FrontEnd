import {
  createContext,
  useContext,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { usePathname } from "expo-router";

import { SelectMissionService } from "../Services/MissionServices";

import { useStorageItemsContext } from "Contexts/useStorageItemsContext";
import { useAuth } from "Features/Auth/Contexts/useAuth";

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
  const { updateMissionDay, userToken } = useStorageItemsContext();
  const {
    user: { id },
  } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const pathname = usePathname();

  const { fetchMissions, dailyMissions, weeklyMissions, monthlyMissions } =
    useGetMissions(id);

  function getActualDay(): UpdateDay {
    const dateNow = new Date();

    return {
      day: dateNow.getDate(),
      month: dateNow.getMonth(),
    };
  }

  async function handleSelectMissions() {
    try {
      setIsLoading(true);
      const token = await userToken.get();
      const { status } = await SelectMissionService({ id }, token);

      if (status < 300) {
        await fetchMissions();

        const updateDay = getActualDay();

        updateMissionDay.set(JSON.stringify(updateDay));
      }
    } catch (error) {
      console.error("Erro ao processar missão:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (pathname === "/Content/Missions") {
      fetchMissions();
    }
  }, [pathname, fetchMissions]);

  useEffect(() => {
    updateMissionDay.get().then((lastUpdateString) => {
      let lastUpdate: UpdateDay;

      if (lastUpdateString.length) {
        lastUpdate = JSON.parse(lastUpdateString);
      } else {
        setTimeout(() => {
          handleSelectMissions();
        }, 1000);
        lastUpdate = getActualDay();
      }

      const now = getActualDay();

      if (lastUpdate.day !== now.day || lastUpdate.month !== now.month) {
        setTimeout(() => {
          handleSelectMissions();
        }, 1000);
      }
    });
  }, [pathname]);

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
