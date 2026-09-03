import { View } from "react-native";

import { AppConfig } from "Config/appConfig";
const { colors } = AppConfig;

import Paragraph from "Components/Paragraph";
import ProgressBar from "Components/ProgressBar";

import { UserMission } from "../Types/MissionsTypes";

export default function WeeklyMissionProgress({
  weeklyMission,
}: {
  weeklyMission: UserMission;
}) {
  const { mission, progress } = weeklyMission;
  const { target, name } = mission;

  return (
    <View
      style={{
        height: 130,
        padding: 25,
        justifyContent: "center",
        gap: 15,
      }}
    >
      <Paragraph fontSize="normal" textAlign="left" fontWeight="bold">
        {name}
      </Paragraph>

      <ProgressBar
        actualValue={progress}
        maxValue={target}
        style={{ backgroundColor: colors.contentBackColor.Dark }}
      >
        {`${progress}/${target}`}
      </ProgressBar>
    </View>
  );
}
