import { View } from "react-native";
import Paragraph from "@Components/Paragraph";
import WeeklyMissionsContainer from "../Components/WeeklyMissionsContainer";
import { WeeklyMissionsStyles } from "../Styles/WeeklyMissions.css";

export default function WeeklyMissions() {
  const { container, title } = WeeklyMissionsStyles;

  return (
    <View style={container}>
      <Paragraph textAlign="left" fontWeight="bold" style={title}>
        Missão Semanal
      </Paragraph>

      <WeeklyMissionsContainer />
    </View>
  );
}
