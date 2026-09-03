import { StyleSheet, View } from "react-native";

import { AppConfig } from "Config/appConfig";
const { colors } = AppConfig;

import Paragraph from "Components/Paragraph";
import Picture from "Components/Picture";
import ProgressBar from "Components/ProgressBar";

import { MissionAssets } from "../Assets/MissionAssets";

import { UserMission } from "../Types/MissionsTypes";

export default function MonthlyMissionProgress({
  monthlyMission,
}: {
  monthlyMission: UserMission;
}) {
  const { mission, progress } = monthlyMission;
  const { name, target } = mission;
  return (
    <View style={missionItem}>
      <Paragraph textAlign="left" fontWeight="bold">
        {name}
      </Paragraph>

      <View style={progressWrapper}>
        <ProgressBar
          maxValue={target}
          actualValue={progress}
          style={progressBar}
        >
          {`${progress}/${target}`}
        </ProgressBar>
        <Picture
          folder="missions"
          source={MissionAssets.chest}
          style={rewardIcon}
        />
      </View>
    </View>
  );
}

const CHEST_SIZE = 60;

export const { missionItem, progressWrapper, progressBar, rewardIcon } =
  StyleSheet.create({
    missionItem: {
      gap: 10,
      paddingHorizontal: 20,
    },

    progressWrapper: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    progressBar: {
      flex: 1,
      backgroundColor: colors.contentBackColor.Dark,
    },
    rewardIcon: {
      position: "absolute",
      right: 0,
      transform: [{ translateY: -5 }],
      width: CHEST_SIZE,
      height: CHEST_SIZE,
      borderRadius: 8,
    },
  });
