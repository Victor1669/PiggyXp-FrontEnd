import { StatusBar, StyleSheet, View } from "react-native";

import { useMissions } from "../Contexts/MissionsContext";

import Paragraph from "@Components/Paragraph";
import DailyMissionsContainer from "../Components/DailyMissionsContainer";

export default function MissionsHeader() {
  const { isLoading } = useMissions();

  if (!isLoading)
    return (
      <View style={container}>
        <Paragraph style={headerText}>
          Dica: As recompensas das missões são adicionadas automaticamente assim
          que forem cumpridas
        </Paragraph>

        <DailyMissionsContainer />
      </View>
    );
}

const { container, headerText } = StyleSheet.create({
  container: {
    backgroundColor: "#314A63",
    paddingHorizontal: "5%",
    paddingTop: (StatusBar.currentHeight ?? 55) + 20,
  },
  headerText: {
    marginBottom: 20,
  },
});
