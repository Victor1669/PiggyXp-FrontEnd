import { RankingUserInfoType } from "Features/Ranking/Types/RankingTypes";

export const PreviewRanking = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  img: null,
  name: "Teste",
  xp: 0,
})) as RankingUserInfoType[];
