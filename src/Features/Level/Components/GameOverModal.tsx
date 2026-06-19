import React, { useEffect } from "react";
import { Image, View } from "react-native";
import { router } from "expo-router";

import { useStatus } from "Contexts/StatusContext";
import { useQuiz } from "../Contexts/useQuiz";

import DefaultModal from "Components/DefaultModal";
import Button from "@Components/Button";

import { LevelAssets } from "../Assets/LevelAssets";
const { gameOver } = LevelAssets;

export default function GameOverModal() {
  const { modalType, showStatus, hideStatus, isVisible } = useStatus();
  const { losed, dispatch } = useQuiz();

  useEffect(() => {
    if (losed) {
      showStatus("gameOver");
    }
  }, [losed]);

  async function handleFinishQuiz() {
    hideStatus();
    dispatch({ type: "QUIZ_ACABOU" });
  }

  return (
    <DefaultModal
      showModal={isVisible && modalType === "gameOver"}
      animationType="slide"
      onClose={() => {
        handleFinishQuiz();
        router.replace("/Content");
      }}
    >
      <View style={{ alignItems: "center", gap: 15, paddingHorizontal: 10 }}>
        <Image style={{ width: 300, height: 300 }} source={gameOver} />

        <Button
          onPress={() => {
            handleFinishQuiz();
            router.replace("/Content/Loja");
          }}
        >
          Comprar mais vidas
        </Button>
        <Button
          onPress={() => {
            handleFinishQuiz();
            router.replace("/Content");
          }}
          style={{ backgroundColor: "rgb(255, 255, 255)" }}
          shadowColor="transparent"
          fontColor="#000"
        >
          Voltar ao Início
        </Button>
      </View>
    </DefaultModal>
  );
}
