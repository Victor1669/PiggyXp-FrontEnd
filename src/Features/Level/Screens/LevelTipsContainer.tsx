import { View } from "react-native";
import { router } from "expo-router";

import { useQuiz } from "Features/Level/Contexts/useQuiz";

import { textFormatter } from "../Utils/textFormatter";

import Button from "@Components/Button";
import Book from "../Components/Book";

export default function LevelTipsContainer() {
  const { initialText } = useQuiz();

  const [string1, string2] = textFormatter(initialText);

  function handleContinue() {
    router.replace("/Level/?questionIndex=0");
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Book leftText={string1} rightText={string2} />
      <Button style={{ marginTop: 70 }} onPress={handleContinue}>
        Continuar
      </Button>
    </View>
  );
}
