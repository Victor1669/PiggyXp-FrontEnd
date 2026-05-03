import { View } from "react-native";
import Paragraph from "@Components/Paragraph";
import MonthlyMissionsContainer from "../Components//MonthlyMissionsContainer";
import { MonthlyMissionsStyles } from "../Styles/MonthlyMissions.css";

export default function MonthlyMissions() {
  const { container, title } = MonthlyMissionsStyles;

  return (
    <View style={container}>
      <Paragraph textAlign="left" fontWeight="bold" style={title}>
        Missão Mensal
      </Paragraph>

      <MonthlyMissionsContainer />
    </View>
  );
}
