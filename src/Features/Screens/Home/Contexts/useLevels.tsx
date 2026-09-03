import { createContext, useContext, useEffect, useState } from "react";

import { AppConfig } from "Config/appConfig";

import { getTitleApi } from "@Services/homeServices";

import { getStorageItem, STORAGE_KEYS } from "Utils/securestore";
import { generateLevels } from "Utils/homeHelpers";

import { useAuth } from "Features/Auth/Contexts/useAuth";

import { LevelType } from "../Types/LevelType";

interface LevelsContextData {
  levels: LevelType[];
  selectedLevelIndex: number;
  setSelectedLevelIndex: React.Dispatch<React.SetStateAction<number>>;
  actualLevel: number;
  unitTitle: string;
  isLoading: boolean;
}

const LevelsContext = createContext<LevelsContextData>({} as LevelsContextData);

export function LevelsProvider({ children }: { children: React.ReactNode }) {
  const {
    user: { nivel_ph, difficulty },
  } = useAuth();

  const actualLevel = nivel_ph ?? 0 + 1;

  const [selectedLevelIndex, setSelectedLevelIndex] = useState(nivel_ph);
  const [unitTitle, setUnitTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const levels = generateLevels(actualLevel);

  async function updateTitle() {
    setIsLoading(true);

    const userUnit = await getStorageItem(STORAGE_KEYS.userUnit);

    if (userUnit) {
      const { data, status } = await getTitleApi(difficulty, +userUnit || 1);

      setUnitTitle(status < 300 ? data.tittle : "");
    }

    setIsLoading(false);
  }

  useEffect(() => {
    if (typeof difficulty !== "number") return;

    updateTitle();
  }, [difficulty]);

  return (
    <LevelsContext.Provider
      value={{
        levels,
        selectedLevelIndex,
        setSelectedLevelIndex,
        actualLevel,
        unitTitle: AppConfig.isPreviewBuild ? "Unidade teste" : unitTitle,
        isLoading,
      }}
    >
      {children}
    </LevelsContext.Provider>
  );
}

export const useLevels = (): LevelsContextData => {
  const context = useContext(LevelsContext);

  if (!context) {
    throw new Error("useLevels usado fora do LevelsProvider!");
  }

  return context;
};
