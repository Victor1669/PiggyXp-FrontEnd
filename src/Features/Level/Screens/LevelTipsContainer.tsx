import { View, Text } from "react-native";
import { router } from "expo-router";

import { useQuiz } from "Features/Level/Contexts/useQuiz";

import Button from "@Components/Button";

import { GlobalFontColors } from "@Assets/Colors";

export default function LevelTipsContainer() {
  const { initialText } = useQuiz();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text
        style={{
          color: GlobalFontColors.Dark,
          textAlign: "center",
          width: "80%",
        }}
      >
        {initialText}
      </Text>
      <Button onPress={() => router.replace("/Level/?questionIndex=0")}>
        Continuar
      </Button>
    </View>
  );
}
