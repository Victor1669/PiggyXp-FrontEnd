import { View, Text } from "react-native";
import { router } from "expo-router";

import { screenValues } from "Config/screenValues";

import Button from "@Components/Button";
import Picture from "@Components/Picture";

import { LevelAssets } from "../Assets/LevelAssets";
import { GlobalFontColors } from "@Assets/Colors";
import { useQuiz } from "../Contexts/useQuiz";

const {
  fontSizes: { DEFAULT_FONT_SIZE, BIG_FONT_SIZE },
} = screenValues();

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
      <Text
        style={{
          color: GlobalFontColors.Dark,
          fontSize: BIG_FONT_SIZE,
          marginHorizontal: 75,
          //   backgroundColor: "red",
          textAlign: "center",
        }}
      >
        Impressionante, você é fora da curva!
      </Text>
      <View style={{ gap: 20 }}>
        <Text
          style={{
            color: GlobalFontColors.Dark,
            fontSize: BIG_FONT_SIZE,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {rightAnswers} / {questions.length}
        </Text>

        <Text
          style={{
            color: "#E2FF41",
            fontSize: BIG_FONT_SIZE,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {(seconds / 60).toFixed(0)} : {seconds % 60 < 10 ? 0 : ""}
          {seconds % 60}
        </Text>
        <View style={{ flexDirection: "row", gap: 70 }}>
          <Text
            style={{
              color: GlobalFontColors.Dark,
              fontSize: DEFAULT_FONT_SIZE,
              fontWeight: "bold",
            }}
          >
            +30 coins
          </Text>
          <Text
            style={{
              color: GlobalFontColors.Dark,
              fontSize: DEFAULT_FONT_SIZE,
              fontWeight: "bold",
            }}
          >
            +150 xp
          </Text>
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
