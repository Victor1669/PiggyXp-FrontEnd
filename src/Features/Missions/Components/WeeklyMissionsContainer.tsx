import { View } from "react-native";

import Paragraph from "@Components/Paragraph";
import ProgressBar from "Components/ProgressBar";
import Picture from "@Components/Picture";

import { WeeklyMissionsStyles } from "../Styles/WeeklyMissions.css";

import { GlobalColors } from "Assets/Colors";
import { MissionAssets } from "../Assets/MissionAssets";

export default function WeeklyMissionsContainer() {
  const { cardContainer, topPart, picture, bottomPart } = WeeklyMissionsStyles;

  return (
    <View style={cardContainer}>
      <View style={topPart}>
        <Picture
          folder="missions"
          source={MissionAssets.weeklyImage}
          style={picture}
        />
      </View>

      <View style={bottomPart}>
        <Paragraph fontSize="normal" textAlign="left" fontWeight="bold">
          Ganhe 1000xp
        </Paragraph>

        <ProgressBar
          maxValue={1000}
          actualValue={450}
          style={{ backgroundColor: GlobalColors.contentBackColor.Dark }}
        />
      </View>
    </View>
  );
}
