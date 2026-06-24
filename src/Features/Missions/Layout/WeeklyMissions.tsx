import { View } from "react-native";

import { useMissions } from "../Contexts/MissionsContext";

import Paragraph from "@Components/Paragraph";
import WeeklyMissionsContainer from "../Components/WeeklyMissionsContainer";

import { WeeklyMissionsStyles } from "../Styles/WeeklyMissions.css";
const { container, title } = WeeklyMissionsStyles;

export default function WeeklyMissions() {
  const { isLoading } = useMissions();

  if (!isLoading)
    return (
      <View style={container}>
        <Paragraph textAlign="left" fontWeight="bold" style={title}>
          Missão Semanal
        </Paragraph>

        <WeeklyMissionsContainer />
      </View>
    );
}
