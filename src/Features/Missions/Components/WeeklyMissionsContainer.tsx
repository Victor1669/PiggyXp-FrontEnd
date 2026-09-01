import { StyleSheet, View } from "react-native";

import { useMissions } from "../Contexts/MissionsContext";

import Picture from "@Components/Picture";
import WeeklyMissionProgress from "./WeeklyMissionProgress";

import { MissionAssets } from "../Assets/MissionAssets";
import { GlobalColors } from "Assets/Colors";

export default function WeeklyMissionsContainer() {
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

const { cardContainer, picture, topPart } = StyleSheet.create({
  cardContainer: {
    overflow: "visible",
    marginTop: 40,
    backgroundColor: GlobalColors.sectionBackColor,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#ffffff",
  },
  topPart: {
    backgroundColor: "#FFFFFF",
    height: 175,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    borderRadius: 10,
  },
  picture: {
    width: 200,
    height: 200,
    marginTop: -60,
  },
});
