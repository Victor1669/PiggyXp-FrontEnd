import { createContext, useContext, useEffect, useState } from "react";

import { screenValues } from "Config/screenValues";

import { RankingService } from "../Services/RankingService";

import { useAuth } from "Features/Auth/Contexts/useAuth";
import { useStatus } from "Contexts/StatusContext";

import { RankingUserInfoType } from "../Types/RankingTypes";

import { PreviewRanking } from "Features/Preview/PreviewRanking";

type RankingContextType = {
  podiumUsers: RankingUserInfoType[];
  otherUsers: RankingUserInfoType[];
  isYourUserInRanking: boolean;
};

const RankingContext = createContext<RankingContextType | null>(null);

export function RankingProvider({ children }: { children: React.ReactNode }) {
  const [rankingUsers, setRankingUsers] =
    useState<RankingUserInfoType[]>(PreviewRanking);

  const { isPreviewBuild } = screenValues();

  const { user } = useAuth();
  const { showStatus, hideStatus } = useStatus();

  const firstPlace = rankingUsers[0] ?? {};
  const secondPlace = rankingUsers[1] ?? {};
  const thirdPlace = rankingUsers[2] ?? {};

  const podiumUsers = [secondPlace, firstPlace, thirdPlace];
  const otherUsers = rankingUsers.slice(3);

  const isYourUserInRanking =
    rankingUsers.filter((rankingUser) => {
      return rankingUser.name === user.name;
    }).length > 0;

  useEffect(() => {
    if (isPreviewBuild) return;

    showStatus("loading");

    RankingService()
      .then(({ data: rankingUsers }: { data: RankingUserInfoType[] }) => {
        setRankingUsers(rankingUsers);
      })
      .finally(() => {
        hideStatus();
      });
  }, [user.name, user.user_img, user.xp]);

  return (
    <RankingContext.Provider
      value={{
        podiumUsers,
        otherUsers,
        isYourUserInRanking,
      }}
    >
      {children}
    </RankingContext.Provider>
  );
}

export function useRanking() {
  const context = useContext(RankingContext);

  if (!context)
    throw new Error("RankingContext usado fora do RankingProvider!");

  return context;
}
