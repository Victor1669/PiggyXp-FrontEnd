import { View } from "react-native";
import { useNavigation } from "expo-router";
import { useStatus } from "Contexts/StatusContext";
import { useQuiz } from "Features/Level/Contexts/useQuiz";
import Paragraph from "Components/Paragraph";
import Button from "@Components/Button";
import DefaultModal from "Components/DefaultModal";

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
    >
      <Paragraph textAlign="center" style={{ marginBottom: 20 }}>
        Tem certeza que deseja sair? Seu progresso será perdido.
      </Paragraph>

      <View style={{ gap: 10 }}>
        <Button onPress={hideStatus}>Continuar Jogando</Button>

        <Button
          onPress={handleConfirmExit}
          style={{ backgroundColor: "rgb(255, 57, 57)" }}
          shadowColor="rgb(139, 0, 0)"
        >
          Sair do Quiz
        </Button>
      </View>
    </DefaultModal>
  );
}
