import { ActivityIndicator, Modal, View } from "react-native";
import { useStatus } from "Contexts/StatusContext";
import Paragraph from "@Components/Paragraph";
import { LoadingSpinnerStyles } from "./LoadingSpinner.css";

const { container } = LoadingSpinnerStyles;

export default function StatusModal() {
  const { modalType, isVisible } = useStatus();

  if (isVisible && modalType === "loading") {
    return (
      <Modal visible={isVisible} transparent animationType="fade">
        <View style={container}>
          <View style={{ transform: [{ scale: 2.5 }], marginBottom: 30 }}>
            <ActivityIndicator size="large" />
          </View>
          <Paragraph>Carregando...</Paragraph>
        </View>
      </Modal>
    );
  }

  return null;
}
