import { RankingProvider } from "Features/Ranking/Contexts/RankingContext";
import RankingContainer from "Features/Ranking/RankingContainer";

export default function Ranking() {
  return (
    <RankingProvider>
      <RankingContainer />
    </RankingProvider>
  );
}
