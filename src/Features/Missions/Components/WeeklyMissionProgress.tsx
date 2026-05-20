import { View, Text } from "react-native";

import Paragraph from "Components/Paragraph";
import ProgressBar from "Components/ProgressBar";

import { GlobalColors } from "Assets/Colors";
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
        style={{ backgroundColor: GlobalColors.contentBackColor.Dark }}
      >
        {`${progress}/${target}`}
      </ProgressBar>
    </View>
  );
}
