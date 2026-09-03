import { Stack } from "expo-router";

import { AppConfig } from "Config/appConfig";
const { colors } = AppConfig;

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
            backgroundColor: colors.contentBackColor.Dark,
          },
        }}
      />
    </QuizProvider>
  );
}
