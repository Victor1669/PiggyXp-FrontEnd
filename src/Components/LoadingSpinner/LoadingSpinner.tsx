import { Image, Modal, Text, View } from "react-native";

import { useShowModal } from "Contexts/useShowModal";

import { LoadingSpinnerStyles } from "./LoadingSpinner.css";
const { container, spinner, text } = LoadingSpinnerStyles;

export default function LoadingSpinner() {
  const { showModal } = useShowModal();
  if (showModal)
    return (
      <Modal transparent={true}>
        <View style={container}>
          <Image source={require("./Spinner.gif")} style={spinner} />
          <Text style={text}>Carregando...</Text>
        </View>
      </Modal>
    );
}
