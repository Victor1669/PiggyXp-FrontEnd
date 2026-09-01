import React from "react";
import RN, { Modal, View, StatusBar } from "react-native";

interface DefaultModalProps {
  children: React.ReactNode;
  showModal: boolean;
  animationType?: "none" | "slide" | "fade";
  modalStyle?: RN.StyleProp<RN.ViewStyle>;
  containerStyle?: RN.StyleProp<RN.ViewStyle>;
  onClose?: () => void;
}

export default function DefaultModal({
  children,
  showModal,
  animationType = "fade",
  modalStyle,
  onClose,
}: DefaultModalProps) {
  return (
    <Modal
      visible={showModal}
      transparent
      animationType={animationType}
      onRequestClose={onClose}
    >
      <View
        style={[
          {
            flex: 1,
            backgroundColor: "#000000cc",
            justifyContent: "center",
            paddingTop: StatusBar.currentHeight,
            paddingBottom: 60,
          },
          modalStyle,
        ]}
      >
        {children}
      </View>
    </Modal>
  );
}
