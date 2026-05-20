import { Fragment } from "react";
import { View } from "react-native";

import { useMissions } from "../Contexts/MissionsContext";

import MonthlyMissionProgress from "./MonthlyMissionProgress";

import { MonthlyMissionsStyles } from "../Styles/MonthlyMissions.css";

export default function MonthlyMissionsContainer() {
  const { sectionContainer, separator } = MonthlyMissionsStyles;

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
