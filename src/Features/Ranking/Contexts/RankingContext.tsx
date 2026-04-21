import { createContext, useContext, useEffect, useState } from "react";

import { RankingService } from "../Services/RankingService";

import { useAuth } from "Features/Auth/Contexts/useAuth";

import { UserInfoType } from "../Types/RankingTypes";

type RankingContextType = {
  podiumUsers: UserInfoType[];
  otherUsers: UserInfoType[];
  isYourUserInRanking: boolean;
  isLoading: boolean;
};

const RankingContext = createContext<RankingContextType | null>(null);

const defaultUsers = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  img: null,
  nivel: 0,
  name: "Teste",
  xp: 0,
})) as UserInfoType[];

export function RankingProvider({ children }: { children: React.ReactNode }) {
  const [rankingUsers, setRankingUsers] =
    useState<UserInfoType[]>(defaultUsers);
  const [isLoading, setIsLoading] = useState(false);

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
    (async () => {
      setIsLoading(true);

      const { data: rankingUsers }: { data: UserInfoType[] } =
        await RankingService();

      setRankingUsers(rankingUsers);

      setIsLoading(false);
    })();
  }, [user.xp]);

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
