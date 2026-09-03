import { StyleSheet, View } from "react-native";

import { AppConfig } from "Config/appConfig";
const { colors } = AppConfig;

import Paragraph from "Components/Paragraph";

import { useLivesTimer } from "../Hooks/useLivesTimer";

export default function LivesTimer() {
  const { timer } = useLivesTimer();

  return (
    <View style={livesTimerContainer}>
      <Paragraph textAlign="left">Timer de vidas</Paragraph>
      <View style={livesTimerContent}>
        <Paragraph
          textAlignVertical="center"
          textAlign="center"
          fontSize="big"
          style={{ flex: 1 }}
        >
          {timer ? timer : "Suas vidas estão cheias"}
        </Paragraph>
      </View>
    </View>
  );
}

const { livesTimerContainer, livesTimerContent } = StyleSheet.create({
  livesTimerContainer: { width: "90%", marginTop: 10 },

  livesTimerContent: {
    height: 80,
    marginTop: 10,
    backgroundColor: colors.sectionBackColor,
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 15,
  },
});
