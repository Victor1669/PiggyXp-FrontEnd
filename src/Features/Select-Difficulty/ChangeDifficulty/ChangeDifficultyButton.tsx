import { useState } from "react";
import { Pressable } from "react-native";

import { changeDifficultyApi } from "@Services/changeDifficultyApi";

import Button from "Components/Button";
import DefaultModal from "Components/DefaultModal";
import Paragraph from "Components/Paragraph";

export default function ChangeDifficultyButton() {
  const [showModal, setShowModal] = useState(false);

  const close = () => setShowModal(false);

  function handleOpenModal() {
    setShowModal(true);
  }

  async function handleSelectDifficulty(difficulty: number) {
    await changeDifficultyApi({ difficulty });

    close();
  }

  return (
    <>
      <DefaultModal
        modalStyle={{ gap: 30 }}
        onClose={close}
        showModal={showModal}
      >
        <Pressable
          style={{ top: 50, left: 30, position: "absolute" }}
          onPress={close}
        >
          <Paragraph fontSize={"title"}>X</Paragraph>
        </Pressable>
        <Paragraph>Selecione a dificuldade:</Paragraph>
        <Button
          onPress={() => {
            handleSelectDifficulty(0);
          }}
        >
          Fácil
        </Button>
        <Button
          style={{ backgroundColor: "gold" }}
          shadowColor="rgb(182, 139, 0)"
          onPress={() => {
            handleSelectDifficulty(1);
          }}
        >
          Médio
        </Button>
        <Button
          style={{ backgroundColor: "rgb(175, 1, 1)" }}
          shadowColor="rgb(92, 0, 0)"
          fontColor="#fff"
          onPress={() => {
            handleSelectDifficulty(2);
          }}
        >
          Difícil
        </Button>
      </DefaultModal>
      <Button style={{ marginVertical: 30 }} onPress={handleOpenModal}>
        Mudar dificuldade
      </Button>
    </>
  );
}
