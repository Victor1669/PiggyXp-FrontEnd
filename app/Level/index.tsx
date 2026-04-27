import { useEffect } from "react";
import { BackHandler } from "react-native";
import { useNavigation } from "expo-router";

import { useQuiz } from "Features/Level/Contexts/useQuiz";
import { useStatus } from "Contexts/StatusContext";

import LevelContainer from "Features/Level/Screens/LevelContainer";
import LevelModal from "Features/Level/Components/LevelModal";
import GameOverModal from "Features/Level/Components/GameOverModal";

export default function QuizScreen() {
  const navigation = useNavigation();
  const { showStatus, isVisible } = useStatus();
  const { timerActive } = useQuiz();

  useEffect(() => {
    const backAction = () => {
      if (timerActive) {
        showStatus("confirmExit");
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    const unsubscribe = navigation.addListener("beforeRemove", (e) => {
      const actionType = e.data.action.type;
      const isExiting = actionType === "GO_BACK" || actionType === "POP";

      if (!timerActive || !isExiting || isVisible) return;

      e.preventDefault();
      showStatus("confirmExit");
    });

    return () => {
      backHandler.remove();
      unsubscribe();
    };
  }, [timerActive, navigation, isVisible]);

  return (
    <>
      <LevelContainer />
      <LevelModal />
      <GameOverModal />
    </>
  );
}
