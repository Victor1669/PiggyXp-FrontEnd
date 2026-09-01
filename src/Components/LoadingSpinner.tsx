import { ActivityIndicator, Modal, View } from "react-native";

import { useStatus } from "Contexts/StatusContext";

import Paragraph from "@Components/Paragraph";

export default function LoadingSpinner() {
  const { modalType, isVisible } = useStatus();

  if (isVisible && modalType === "loading") {
    return (
      <Modal visible={isVisible} transparent animationType="fade">
        <View
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            opacity: 1,
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            gap: 15,
          }}
        >
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
