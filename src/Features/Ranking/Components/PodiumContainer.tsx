import { StyleSheet, View } from "react-native";

import { useRanking } from "../Contexts/RankingContext";

import PodiumUserContainer from "./PodiumUserContainer";

import { screenValues } from "Config/screenValues";
const { deviceHeight } = screenValues();

const PODIUM_POSITIONS = [2, 1, 3] as const;

export default function PodiumContainer() {
  const { podiumUsers } = useRanking();

  return (
    <View style={container}>
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

const { container } = StyleSheet.create({
  container: {
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 15,
    height: deviceHeight * 0.35,
    marginTop: 20,
  },
});
