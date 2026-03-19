import { View } from "react-native";
import { router } from "expo-router";

import { useQuiz } from "../Contexts/useQuiz";

import Button from "@Components/Button";
import Picture from "@Components/Picture";
import Paragraph from "@Components/Paragraph";

import { LevelAssets } from "../Assets/LevelAssets";

export default function LevelConclusionContainer() {
  const { seconds, rightAnswers, questions } = useQuiz();

  return (
    <View
      style={{
        gap: 50,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Picture
        folder=""
        source={LevelAssets.homem}
        style={{
          width: "70%",
          aspectRatio: 16 / 9,
        }}
      />
      <Paragraph
        style={{
          marginHorizontal: 75,
        }}
        fontSize="big"
      >
        Impressionante, você é fora da curva!
      </Paragraph>
      <View style={{ gap: 20 }}>
        <Paragraph fontSize="big" fontWeight="bold" textAlign="center">
          {rightAnswers} / {questions.length}
        </Paragraph>

        <Paragraph color="#E2FF41" fontSize="big" fontWeight="bold">
          {(seconds / 60).toFixed(0)} : {seconds % 60 < 10 ? 0 : ""}
          {seconds % 60}
        </Paragraph>
        <View style={{ flexDirection: "row", gap: 70 }}>
          <Paragraph fontWeight="bold">+30 coins</Paragraph>
          <Paragraph fontWeight="bold">+150 xp</Paragraph>
        </View>
      </View>
      <Button
        onPress={() => router.replace("/Content")}
        style={{ marginTop: 50 }}
      >
        Receber xp
      </Button>
    </View>
  );
}
