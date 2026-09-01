import { StyleSheet, View } from "react-native";

import Paragraph from "@Components/Paragraph";
import ProgressBar from "Components/ProgressBar";
import Picture from "@Components/Picture";

import { MissionAssets } from "../Assets/MissionAssets";
import { GlobalColors } from "Assets/Colors";

import { UserMission } from "../Types/MissionsTypes";

export default function DailyMissionProgress({
  dailyMission,
}: {
  dailyMission: UserMission;
}) {
  const { mission, progress } = dailyMission;
  const { target, name } = mission;

  return (
    <View style={container}>
      <View style={textContainer}>
        <Paragraph>{name}</Paragraph>
      </View>

      <View style={barWrapper}>
        <ProgressBar
          maxValue={target}
          actualValue={progress}
          style={progressBar}
        >
          {`${progress}/${target}`}
        </ProgressBar>

        <Picture
          folder="missions"
          source={MissionAssets.gift}
          style={rewardIcon}
        />
      </View>
    </View>
  );
}

const GIFT_SIZE = 90;

const { barWrapper, container, progressBar, rewardIcon, textContainer } =
  StyleSheet.create({
    container: {
      backgroundColor: GlobalColors.contentBackColor.Dark,
      padding: 20,
      borderRadius: 12,
      marginVertical: 10,
      gap: 20,
    },
    textContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    barWrapper: {
      flexDirection: "row",
      alignItems: "center",
      height: 40,
    },
    progressBar: {
      flex: 1,
      height: 40,
    },
    rewardIcon: {
      position: "absolute",
      right: -25,
      transform: [{ translateY: -5 }],
      width: GIFT_SIZE,
      height: GIFT_SIZE,
      zIndex: 2,
    },
  });
