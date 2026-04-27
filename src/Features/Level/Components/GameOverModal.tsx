import React, { useEffect } from "react";
import { View } from "react-native";
import { router } from "expo-router";

import { useStatus } from "Contexts/StatusContext";
import { useQuiz } from "../Contexts/useQuiz";

import DefaultModal from "Components/DefaultModal";
import Paragraph from "Components/Paragraph";
import Button from "@Components/Button";

export default function GameOverModal() {
  const { modalType, showStatus, hideStatus, isVisible } = useStatus();
  const { losed, dispatch } = useQuiz();

  useEffect(() => {
    if (losed) {
      showStatus("gameOver");
    }
  }, [losed]);

  async function handleGoHome() {
    hideStatus();
    dispatch({ type: "QUIZ_ACABOU" });

    router.replace("/Content");
  }

  return (
    <DefaultModal
      showModal={isVisible && modalType === "gameOver"}
      animationType="slide"
      onClose={handleGoHome}
    >
      <View style={{ alignItems: "center", gap: 15, paddingHorizontal: 10 }}>
        <Paragraph
          fontSize="big"
          textAlign="center"
          style={{ fontWeight: "bold" }}
        >
          Fim de jogo!
        </Paragraph>

        <Paragraph textAlign="center">
          Infelizmente suas vidas acabaram.
        </Paragraph>

        <View style={{ width: "100%", gap: 10, marginTop: 10 }}>
          <Button
            onPress={handleGoHome}
            style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
            shadowColor="transparent"
            fontColor="#fff"
          >
            Voltar ao Início
          </Button>
        </View>
      </View>
    </DefaultModal>
  );
}
