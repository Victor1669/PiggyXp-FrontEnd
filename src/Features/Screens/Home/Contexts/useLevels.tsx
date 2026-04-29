import { createContext, useContext, useEffect, useState } from "react";

import { screenValues } from "Config/screenValues";

import { TitlesService } from "../Services/TitlesService";

import { useAuth } from "Features/Auth/Contexts/useAuth";

import { HomeImages } from "../Assets/HomeImages";
const {
  content: { star, graphic, trophy },
} = HomeImages;

import { GlobalImages } from "@Assets/GlobalImages";
const {
  tabBar: { loja, missoes, perfil, ranking },
} = GlobalImages;

import { LevelType } from "../Types/LevelType";

interface LevelsContextData {
  levels: LevelType[];
  selectedLevelIndex: number;
  setSelectedLevelIndex: React.Dispatch<React.SetStateAction<number>>;
  actualLevel: number;
  unitTitle: string;
}

const LevelsContext = createContext<LevelsContextData>({} as LevelsContextData);

export function LevelsProvider({ children }: { children: React.ReactNode }) {
  const {
    user: { nivel, difficulty },
    userUnit,
  } = useAuth();

  const { isPreviewBuild } = screenValues();

  const actualLevel = nivel + 1;

  const [selectedLevelIndex, setSelectedLevelIndex] = useState(nivel);
  const [unitTitle, setUnitTitle] = useState("");

  const levels: LevelType[] = [
    {
      id: 1,
      containerPosition: "center",
      isLocked: 1 > actualLevel,
      isPathLocked: 0 > actualLevel - 2,
      imgFolder: "tabbar",
      img: ranking,
    },
    {
      id: 2,
      containerPosition: "flex-start",
      isLocked: 2 > actualLevel,
      isPathLocked: 1 > actualLevel - 2,
      imgFolder: "tabbar",
      img: perfil,
    },
    {
      id: 3,
      containerPosition: "center",
      isLocked: 3 > actualLevel,
      isPathLocked: 2 > actualLevel - 2,
      imgFolder: "tabbar",
      img: missoes,
    },
    {
      id: 4,
      containerPosition: "flex-end",
      isLocked: 4 > actualLevel,
      isPathLocked: 3 > actualLevel - 2,
      imgFolder: "tabbar",
      img: loja,
    },
    {
      id: 5,
      containerPosition: "center",
      isLocked: 5 > actualLevel,
      isPathLocked: 4 > actualLevel - 2,
      imgFolder: "home/content",
      img: graphic,
    },
    {
      id: 6,
      containerPosition: "flex-start",
      isLocked: 6 > actualLevel,
      isPathLocked: 5 > actualLevel - 2,
      imgFolder: "home/content",
      img: star,
    },
    {
      id: 7,
      containerPosition: "center",
      isLocked: 7 > actualLevel,
      isPathLocked: 6 > actualLevel - 2,
      imgFolder: "tabbar",
      img: loja,
    },
    {
      id: 8,
      containerPosition: "flex-end",
      isLocked: 8 > actualLevel,
      isPathLocked: 7 > actualLevel - 2,
      imgFolder: "home/content",
      img: trophy,
    },
  ];

  useEffect(() => {
    if (typeof difficulty !== "number") return;

    (async function () {
      const storedUserUnit = await userUnit.get();

      const { data, status } = await TitlesService(difficulty, +storedUserUnit);

      setUnitTitle(status < 300 ? data.tittle : "");
    })();
  }, [difficulty]);

  return (
    <LevelsContext.Provider
      value={{
        levels,
        selectedLevelIndex,
        setSelectedLevelIndex,
        actualLevel,
        unitTitle: isPreviewBuild ? "Unidade teste" : unitTitle,
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
