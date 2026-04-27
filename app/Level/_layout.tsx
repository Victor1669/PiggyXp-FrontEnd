import { GlobalColors } from "@Assets/Colors";
import { Stack } from "expo-router";

import { QuizProvider } from "Features/Level/Contexts/useQuiz";

export default function _layout() {
  return (
    <QuizProvider>
      <Stack
        screenOptions={{
          headerShown: false,

          contentStyle: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: GlobalColors.contentBackColor.Dark,
          },
        }}
      />
    </QuizProvider>
  );
}
