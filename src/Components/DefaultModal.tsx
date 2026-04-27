import React from "react";
import RN, { Modal, View, StatusBar, StyleSheet } from "react-native";

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
      <View style={[styles.overlay, modalStyle]}>{children}</View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "#000000cc",
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
    paddingBottom: 60,
  },
});
