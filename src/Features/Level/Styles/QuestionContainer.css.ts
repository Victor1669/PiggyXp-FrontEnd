import { StatusBar, StyleSheet } from "react-native";

export const QuestionContainerStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 2 * (StatusBar.currentHeight ?? 20),
  },
  questionText: {
    marginTop: 80,
  },
  answersContainer: {
    gap: 15,
  },
});
