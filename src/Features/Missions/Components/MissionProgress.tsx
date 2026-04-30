import { View, Text } from "react-native";

import Paragraph from "@Components/Paragraph";
import ProgressBar from "Components/ProgressBar";
import Picture from "@Components/Picture";

import { MissionProgressStyles } from "../Styles/MissionProgress.css";
import { MissionAssets } from "../Assets/MissionAssets";

interface MissionProgressProps {
  missionText: string;
  currentValue: number;
  totalValue: number;
}

export default function MissionProgress({
  missionText,
  currentValue,
  totalValue,
}: MissionProgressProps) {
  return (
    <View style={MissionProgressStyles.container}>
      <View style={MissionProgressStyles.textContainer}>
        <Paragraph>{missionText}</Paragraph>
        <Text style={MissionProgressStyles.progressInfo}>
          {currentValue}/{totalValue}
        </Text>
      </View>

      <View style={MissionProgressStyles.barWrapper}>
        <ProgressBar
          maxValue={totalValue}
          actualValue={currentValue}
          style={MissionProgressStyles.progressBar}
        />
        <Picture
          folder="missions"
          source={MissionAssets.gift}
          style={MissionProgressStyles.rewardIcon}
        />
      </View>
    </View>
  );
}
