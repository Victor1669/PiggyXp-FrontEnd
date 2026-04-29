import { useEffect, useState } from "react";
import { View } from "react-native";
import { useAuth } from "Features/Auth/Contexts/useAuth";
import { LivesTimerStyles } from "../Styles/LivesTimer.css";
import { calcLivesTimer } from "../Helpers/calcLivesTimer";
import Paragraph from "Components/Paragraph";

const { livesTimerContainer, livesTimerContent } = LivesTimerStyles;

export default function LivesTimer() {
  const {
    user: { reset_lives_at },
  } = useAuth();

  const [timer, setTimer] = useState<string | null>(() =>
    calcLivesTimer(reset_lives_at),
  );

  useEffect(() => {
    const timerLives = setInterval(() => {
      const timerDate = calcLivesTimer(reset_lives_at);
      setTimer(timerDate);
    }, 1000);

    return () => clearInterval(timerLives);
  }, [reset_lives_at]);

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
