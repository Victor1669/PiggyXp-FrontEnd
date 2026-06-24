import { View } from "react-native";

import { useMissions } from "../Contexts/MissionsContext";

import Paragraph from "@Components/Paragraph";
import MonthlyMissionsContainer from "../Components//MonthlyMissionsContainer";

import { MonthlyMissionsStyles } from "../Styles/MonthlyMissions.css";
const { container, title } = MonthlyMissionsStyles;

export default function MonthlyMissions() {
  const { isLoading } = useMissions();

  if (!isLoading)
    return (
      <View style={container}>
        <Paragraph textAlign="left" fontWeight="bold" style={title}>
          Missão Mensal
        </Paragraph>

        <MonthlyMissionsContainer />
      </View>
    );
}
