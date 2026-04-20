import { ScrollView, View } from "react-native";

import { useRanking } from "./Contexts/RankingContext";

import PodiumContainer from "./Components/PodiumContainer";
import OtherUsersContainer from "./Components/OtherUsersContainer";
import Divider from "./Components/RankingDiviser";
import YourUserOutOfRanking from "./Components/YourUserOutOfRanking";
import Paragraph from "Components/Paragraph";

import { RankingContainerStyles } from "./Styles/RankingContainer.css";
const { container, contentContainer, placeHolder, scrollContainer } =
  RankingContainerStyles;

export default function RankingContainer() {
  const { isLoading, isYourUserInRanking } = useRanking();

  if (!isLoading)
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
