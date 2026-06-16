import { HomeImages } from "../Assets/HomeImages";
const {
  content: { star, graphic, trophy },
} = HomeImages;

import { GlobalImages } from "@Assets/GlobalImages";
const {
  tabBar: { loja, missoes, perfil, ranking },
} = GlobalImages;

import { LevelType } from "../Types/LevelType";

export function generateLevels(actualLevel: number): LevelType[] {
  return [
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
}
