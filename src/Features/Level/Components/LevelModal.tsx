import { Image, View } from "react-native";
import { useNavigation } from "expo-router";

import { useStatus } from "Contexts/StatusContext";
import { useQuiz } from "Features/Level/Contexts/useQuiz";

import Paragraph from "Components/Paragraph";
import Button from "@Components/Button";
import DefaultModal from "Components/DefaultModal";

import { LevelAssets } from "../Assets/LevelAssets";
const { porcoSair } = LevelAssets;

export default function LevelModal() {
  const navigation = useNavigation();
  const { modalType, isVisible, hideStatus } = useStatus();
  const { dispatch } = useQuiz();

  if (modalType !== "confirmExit") return null;

  const handleConfirmExit = () => {
    hideStatus();
    dispatch({ type: "QUIZ_ACABOU" });
    navigation.goBack();
  };

  return (
    <DefaultModal
      animationType="fade"
      showModal={isVisible}
      onClose={hideStatus}
      modalStyle={{ backgroundColor: "#000", gap: 30 }}
    >
      <Image source={porcoSair} style={{ marginInline: "auto" }} />

      <Paragraph>Vai sair da fase?</Paragraph>

      <Paragraph textAlign="center">
        Seu porquinho fica triste quando você desiste de aprender
      </Paragraph>

      <View style={{ gap: 10, flexDirection: "row" }}>
        <Button
          onPress={hideStatus}
          style={{ backgroundColor: "rgb(201, 201, 201)", width: "40%" }}
          shadowColor="rgb(105, 105, 105)"
        >
          Ficar
        </Button>

        <Button style={{ width: "40%" }} onPress={handleConfirmExit}>
          Sair
        </Button>
      </View>
    </DefaultModal>
  );
}
