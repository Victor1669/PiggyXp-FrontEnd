import { View } from "react-native";

import { useRanking } from "../Contexts/RankingContext";

import PodiumUserContainer from "./PodiumUserContainer";

import { PodiumContainerStyles } from "../Styles/PodiumContainer.css";

const PODIUM_POSITIONS = [2, 1, 3] as const;

export default function PodiumContainer() {
  const { podiumUsers } = useRanking();
  return (
    <View style={PodiumContainerStyles.container}>
      {podiumUsers.map((podiumUser, index) => {
        const position = PODIUM_POSITIONS[index] ?? 3;

        return (
          <PodiumUserContainer
            podiumUser={podiumUser}
            position={position}
            key={podiumUser.id}
          />
        );
      })}
    </View>
  );
}
