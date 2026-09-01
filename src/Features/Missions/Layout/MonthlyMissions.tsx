import { StyleSheet, View } from "react-native";

import { useMissions } from "../Contexts/MissionsContext";

import Paragraph from "@Components/Paragraph";
import MonthlyMissionsContainer from "../Components//MonthlyMissionsContainer";

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

export const { container, title } = StyleSheet.create({
  container: {
    paddingHorizontal: "5%",
    marginVertical: 20,
    paddingBottom: 40,
  },
  title: {
    marginBottom: 20,
  },
});
