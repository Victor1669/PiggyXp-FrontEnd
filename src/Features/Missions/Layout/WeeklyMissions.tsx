import { StyleSheet, View } from "react-native";

import { useMissions } from "../Contexts/MissionsContext";

import Paragraph from "@Components/Paragraph";
import WeeklyMissionsContainer from "../Components/WeeklyMissionsContainer";

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

const { container, title } = StyleSheet.create({
  container: {
    paddingHorizontal: "5%",
    marginVertical: 30,
  },
  title: {
    marginBottom: 20,
  },
});
