import RN, { Modal, View, StatusBar } from "react-native";

export default function DefaultModal({
  children,
  showModal,
  modalStyle,
  containerStyle,
}: {
  children: React.ReactNode;
  showModal: boolean;
  modalStyle?: RN.StyleProp<RN.ViewStyle>;
  containerStyle?: RN.StyleProp<RN.ViewStyle>;
}) {
  if (showModal)
    return (
      <Modal transparent animationType="slide">
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
          <View style={[{ width: "90%", margin: "auto" }, containerStyle]}>
            {children}
          </View>
        </View>
      </Modal>
    );
}
