import { Image, Modal, View } from "react-native";
import { useStatus } from "Contexts/StatusContext";
import Paragraph from "@Components/Paragraph";
import { LoadingSpinnerStyles } from "./LoadingSpinner.css";

const { container, spinner } = LoadingSpinnerStyles;

export default function StatusModal() {
  const { modalType, isVisible } = useStatus();

  if (isVisible && modalType === "loading") {
    return (
      <Modal visible={isVisible} transparent animationType="fade">
        <View style={container}>
          <Image source={require("./Spinner.gif")} style={spinner} />
          <Paragraph>Carregando...</Paragraph>
        </View>
      </Modal>
    );
  }

  return null;
}
