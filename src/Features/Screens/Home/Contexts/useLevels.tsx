import { createContext, useContext, useState } from "react";

import { HomeImages } from "../Assets/HomeImages";
const {
  content: { star, graphic, trophy },
} = HomeImages;

import { GlobalImages } from "@Assets/GlobalImages";
const {
  tabBar: { loja, missoes, perfil, ranking },
} = GlobalImages;

interface LevelsContextData {
  levels: LevelType[];
  selectedLevelIndex: number;
  setSelectedLevelIndex: React.Dispatch<React.SetStateAction<number>>;
  actualLevel: number;
}

export type LevelType = {
  id: number;
  title?: string;
  containerPosition: "flex-start" | "center" | "flex-end";
  isLocked: boolean;
  isPathLocked: boolean;
  img: any;
};

const LevelsContext = createContext<LevelsContextData>({} as LevelsContextData);

export function LevelsProvider({ children }: { children: React.ReactNode }) {
  const LEVEL = 1;
  const actualLevel = LEVEL;
  const [selectedLevelIndex, setSelectedLevelIndex] = useState(LEVEL);

  const levels: LevelType[] = [
    {
      id: 1,
      title: "Minha relação como dinheiro",
      containerPosition: "center",
      isLocked: 1 > actualLevel,
      isPathLocked: 0 > actualLevel - 2,
      img: ranking,
    },
    {
      id: 2,
      containerPosition: "flex-start",
      isLocked: 2 > actualLevel,
      isPathLocked: 1 > actualLevel - 2,
      img: perfil,
    },
    {
      id: 3,
      containerPosition: "center",
      isLocked: 3 > actualLevel,
      isPathLocked: 2 > actualLevel - 2,
      img: missoes,
    },
    {
      id: 4,
      containerPosition: "flex-end",
      isLocked: 4 > actualLevel,
      isPathLocked: 3 > actualLevel - 2,
      img: loja,
    },
    {
      id: 5,
      containerPosition: "center",
      isLocked: 5 > actualLevel,
      isPathLocked: 4 > actualLevel - 2,
      img: graphic,
    },
    {
      id: 6,
      containerPosition: "flex-start",
      isLocked: 6 > actualLevel,
      isPathLocked: 5 > actualLevel - 2,
      img: star,
    },
    {
      id: 7,
      containerPosition: "center",
      isLocked: 7 > actualLevel,
      isPathLocked: 6 > actualLevel - 2,
      img: loja,
    },
    {
      id: 8,
      containerPosition: "flex-end",
      isLocked: 8 > actualLevel,
      isPathLocked: 7 > actualLevel - 2,
      img: trophy,
    },
  ];

  return (
    <LevelsContext.Provider
      value={{ levels, selectedLevelIndex, setSelectedLevelIndex, actualLevel }}
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
