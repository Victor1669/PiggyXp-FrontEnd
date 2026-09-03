import { Fragment } from "react";
import { StyleSheet, View } from "react-native";

import { AppConfig } from "Config/appConfig";
const { colors } = AppConfig;

import { useMissions } from "../Contexts/MissionsContext";

import MonthlyMissionProgress from "./MonthlyMissionProgress";

export default function MonthlyMissionsContainer() {
  const { monthlyMissions } = useMissions();

  return (
    <View style={sectionContainer}>
      {monthlyMissions.map((monthlyMission, index) => (
        <Fragment key={index}>
          <MonthlyMissionProgress monthlyMission={monthlyMission} />

          {index !== monthlyMissions.length - 1 && <View style={separator} />}
        </Fragment>
      ))}
    </View>
  );
}

export const { separator, sectionContainer } = StyleSheet.create({
  sectionContainer: {
    backgroundColor: colors.sectionBackColor,
    borderRadius: 24,
    paddingVertical: 20,
    gap: 0,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    overflow: "hidden",
  },

  separator: {
    height: 2,
    backgroundColor: "#FFFFFF",
    width: "100%",
    marginBottom: 20,
    marginTop: 40,
  },
});
