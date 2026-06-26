import Button from "Components/Button";
import DefaultModal from "Components/DefaultModal";
import { useState } from "react";
import { setDifficultyApi } from "../setDifficultyApi";
import { useStorageItemsContext } from "Contexts/useStorageItemsContext";
import Paragraph from "Components/Paragraph";
import { Pressable, Text } from "react-native";

export default function ChangeDifficultyButton() {
  const [showModal, setShowModal] = useState(false);
  const { userToken } = useStorageItemsContext();

  const close = () => setShowModal(false);

  function handleOpenModal() {
    setShowModal(true);
  }

  async function handleSelectDifficulty(difficulty: number) {
    const storedUserToken = String(await userToken.get());

    await setDifficultyApi({ difficulty }, storedUserToken);

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
