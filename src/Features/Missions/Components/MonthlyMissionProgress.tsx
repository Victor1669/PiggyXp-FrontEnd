import { View } from "react-native";

import Paragraph from "Components/Paragraph";
import Picture from "Components/Picture";
import ProgressBar from "Components/ProgressBar";

import { MonthlyMissionsStyles } from "../Styles/MonthlyMissions.css";
import { MissionAssets } from "../Assets/MissionAssets";

import { UserMission } from "../Types/MissionsTypes";

export default function MonthlyMissionProgress({
  monthlyMission,
}: {
  monthlyMission: UserMission;
}) {
  const { missionItem, progressWrapper, progressBar, rewardIcon } =
    MonthlyMissionsStyles;

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
