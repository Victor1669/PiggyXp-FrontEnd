import { useContext, createContext, useState, useEffect } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

import { screenValues } from "Config/screenValues";

import { getAchievementsRewards } from "../AchievementsServices";

import { useInternetConnection } from "Contexts/useInternetConnection";
import { useAuth } from "@Auth/Contexts/useAuth";

import { useAudio } from "Hooks/useAudio";

import { formatAchievements } from "../Helpers/formatAchievements";

import { PreviewUserInfo } from "Features/Preview/PreviewUser";
import { achievementsProgress } from "../Content/achievementsProgress";

import { Achievement } from "../Types/AchievementTypes";

interface AchievementsProviderValues {
  showDescription: boolean;
  setShowDescription: Dispatch<SetStateAction<boolean>>;
  showRewards: boolean;
  setShowRewards: Dispatch<SetStateAction<boolean>>;
  selectedAchievementIndex: number;
  setSelectedAchievementIndex: Dispatch<SetStateAction<number>>;
  selectedAchievement: Achievement;
  achievements: Achievement[];
}

const AchievementsContext = createContext<
  AchievementsProviderValues | undefined
>(undefined);

function AchievementsProvider({ children }: { children: ReactNode }) {
  const [showDescription, setShowDescription] = useState(false);
  const [showRewards, setShowRewards] = useState(false);
  const [selectedAchievementIndex, setSelectedAchievementIndex] =
    useState<number>(0);

  const { user } = useAuth();

  const { load, stop, play } = useAudio();
  const { getIsConnected } = useInternetConnection();

  const { isPreviewBuild } = screenValues();

  const achievements = isPreviewBuild
    ? formatAchievements(PreviewUserInfo, achievementsProgress)
    : formatAchievements(user, achievementsProgress);

  const selectedAchievement = achievements?.[selectedAchievementIndex];

  async function handleReceiveRewards() {
    if (!getIsConnected()) return;

    await getAchievementsRewards(user.id, {
      achievementId: selectedAchievementIndex,
    });
  }

  useEffect(
    function receiveRewards() {
      if (!showRewards) return;
      try {
        (async () => {
          await Promise.all([
            handleReceiveRewards(),
            load(require("../Assets/applauses.wav")),
          ]);
          await play();
        })();
      } catch (err) {
        console.log(err);
      }

      return () => {
        stop();
      };
    },
    [showRewards],
  );

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
