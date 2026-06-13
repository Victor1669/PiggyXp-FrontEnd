import { View } from "react-native";

import Paragraph from "Components/Paragraph";

import { LivesTimerStyles } from "../Styles/LivesTimer.css";
import { useLivesTimer } from "../Hooks/useLivesTimer";

const { livesTimerContainer, livesTimerContent } = LivesTimerStyles;

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
