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
            backgroundColor: GlobalColors.contentBackColor.Dark,
          },
        }}
      ></Stack>
    </QuizProvider>
  );
}
