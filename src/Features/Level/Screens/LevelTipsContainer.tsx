import { View } from "react-native";
import { router } from "expo-router";

import { screenValues } from "Config/screenValues";

import { useQuiz } from "Features/Level/Contexts/useQuiz";

import Button from "@Components/Button";
import Paragraph from "@Components/Paragraph";

export default function LevelTipsContainer() {
  const { initialText } = useQuiz();

  const { deviceWidth } = screenValues();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Paragraph style={{ width: deviceWidth * 0.8 }}>{initialText}</Paragraph>
      <Button onPress={() => router.replace("/Level/?questionIndex=0")}>
        Continuar
      </Button>
    </View>
  );
}
