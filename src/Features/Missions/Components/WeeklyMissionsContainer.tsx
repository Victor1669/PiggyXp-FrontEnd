import { View } from "react-native";

import { useMissions } from "../Contexts/MissionsContext";

import Picture from "@Components/Picture";

import { WeeklyMissionsStyles } from "../Styles/WeeklyMissions.css";

import { MissionAssets } from "../Assets/MissionAssets";
import WeeklyMissionProgress from "./WeeklyMissionProgress";

export default function WeeklyMissionsContainer() {
  const { cardContainer, topPart, picture } = WeeklyMissionsStyles;

  const { weeklyMissions } = useMissions();

  return (
    <View style={cardContainer}>
      <View style={topPart}>
        <Picture
          folder="missions"
          source={MissionAssets.weeklyImage}
          style={picture}
        />
      </View>

      {weeklyMissions.map((weeklyMission, index) => (
        <WeeklyMissionProgress weeklyMission={weeklyMission} key={index} />
      ))}
    </View>
  );
}
