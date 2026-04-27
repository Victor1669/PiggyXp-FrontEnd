import R, { useContext, createContext, useState } from "react";

import { screenValues } from "Config/screenValues";

import { achievementsProgress } from "../Content/achievementsProgress";
import { formatAchievements } from "../Helpers/formatAchievements";
import { useAuth } from "@Auth/Contexts/useAuth";

import { Achievement } from "../Types/AchievementTypes";

import { PreviewUserInfo } from "Features/Preview/PreviewUser";

interface AchievementsProviderValues {
  showDescription: boolean;
  setShowDescription: R.Dispatch<R.SetStateAction<boolean>>;
  showRewards: boolean;
  setShowRewards: R.Dispatch<R.SetStateAction<boolean>>;
  selectedAchievementIndex: number;
  setSelectedAchievementIndex: R.Dispatch<R.SetStateAction<number>>;
  selectedAchievement: Achievement;
  achievements: Achievement[];
}

const AchievementsContext = createContext<
  AchievementsProviderValues | undefined
>(undefined);

function AchievementsProvider({ children }: { children: R.ReactNode }) {
  const [showDescription, setShowDescription] = useState(false);
  const [showRewards, setShowRewards] = useState(false);
  const [selectedAchievementIndex, setSelectedAchievementIndex] =
    useState<number>(0);

  const { user } = useAuth();

  const { isPreviewBuild } = screenValues();

  const achievements = isPreviewBuild
    ? formatAchievements(PreviewUserInfo, achievementsProgress)
    : formatAchievements(user, achievementsProgress);

  const selectedAchievement = achievements?.[selectedAchievementIndex];

  const value: AchievementsProviderValues = {
    showDescription,
    setShowDescription,
    showRewards,
    setShowRewards,
    selectedAchievementIndex,
    setSelectedAchievementIndex,
    achievements,
    selectedAchievement,
  };

  return (
    <AchievementsContext.Provider value={value}>
      {children}
    </AchievementsContext.Provider>
  );
}

function useAchievements() {
  const context = useContext(AchievementsContext);

  if (context === undefined)
    throw new Error("AchievementsContext usado fora do AchievementsProvider!");

  return context;
}

export { useAchievements, AchievementsProvider };
