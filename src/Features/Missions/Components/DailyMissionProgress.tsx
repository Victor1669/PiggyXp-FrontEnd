import { View } from "react-native";

import Paragraph from "@Components/Paragraph";
import ProgressBar from "Components/ProgressBar";
import Picture from "@Components/Picture";

import { DailyMissions } from "../Styles/DailyMissions.css";

import { MissionAssets } from "../Assets/MissionAssets";
import { UserMission } from "../Types/MissionsTypes";

const { barWrapper, container, progressBar, rewardIcon, textContainer } =
  DailyMissions;

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
