import { createContext, useContext, useEffect, useState } from "react";

import { screenValues } from "Config/screenValues";

import { RankingService } from "../Services/RankingService";

import { useAuth } from "Features/Auth/Contexts/useAuth";

import { RankingUserInfoType } from "../Types/RankingTypes";

type RankingContextType = {
  podiumUsers: RankingUserInfoType[];
  otherUsers: RankingUserInfoType[];
  isYourUserInRanking: boolean;
  isLoading: boolean;
};

const RankingContext = createContext<RankingContextType | null>(null);

const defaultUsers = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  img: null,
  name: "Teste",
  xp: 0,
})) as RankingUserInfoType[];

export function RankingProvider({ children }: { children: React.ReactNode }) {
  const [rankingUsers, setRankingUsers] =
    useState<RankingUserInfoType[]>(defaultUsers);
  const [isLoading, setIsLoading] = useState(false);

  const { isPreviewBuild } = screenValues();

  const { user } = useAuth();

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
    (async () => {
      setIsLoading(true);

      const { data: rankingUsers }: { data: RankingUserInfoType[] } =
        await RankingService();

      setRankingUsers(rankingUsers);

      setIsLoading(false);
    })();
  }, [user.name, user.user_img, user.xp]);

  return (
    <RankingContext.Provider
      value={{
        podiumUsers,
        otherUsers,
        isYourUserInRanking,
        isLoading,
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
