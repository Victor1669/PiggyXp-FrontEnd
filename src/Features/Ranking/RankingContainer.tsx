import { ScrollView, StyleSheet, View } from "react-native";

import { useRanking } from "./Contexts/RankingContext";

import { screenValues } from "Config/screenValues";
const { TABBAR_HEIGHT } = screenValues();

import PodiumContainer from "./Components/PodiumContainer";
import OtherUsersContainer from "./Components/OtherUsersContainer";
import Divider from "./Components/RankingDiviser";
import YourUserOutOfRanking from "./Components/YourUserOutOfRanking";
import Paragraph from "Components/Paragraph";

export default function RankingContainer() {
  const { isYourUserInRanking } = useRanking();

  return (
    <View style={container}>
      <ScrollView
        style={scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={contentContainer}
      >
        <PodiumContainer />
        <Divider />
        <OtherUsersContainer />
        {isYourUserInRanking && (
          <Paragraph style={placeHolder}>PiggyXP, 2026 by VSS</Paragraph>
        )}
      </ScrollView>
      {isYourUserInRanking || <YourUserOutOfRanking />}
    </View>
  );
}

const { container, contentContainer, placeHolder, scrollContainer } =
  StyleSheet.create({
    container: { flex: 1, alignItems: "center" },
    scrollContainer: { width: "90%" },
    contentContainer: {
      alignItems: "center",
      paddingBottom: 2 * TABBAR_HEIGHT - 20,
      paddingTop: 50,
    },
    placeHolder: { position: "absolute", bottom: TABBAR_HEIGHT + 40 },
  });
