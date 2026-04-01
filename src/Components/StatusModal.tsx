import { View, Text } from "react-native";

export default function StatusModal({
  typeScreen,
}: {
  typeScreen: "achievementsReward" | "gameOver" | "noInternet" | "loading";
}) {
  return (
    <View>
      <Text>StatusModal</Text>
    </View>
  );
}
