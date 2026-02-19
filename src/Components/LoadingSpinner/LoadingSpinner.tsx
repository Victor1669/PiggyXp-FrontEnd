import { Image, Modal, Text, View } from "react-native";

import { useShowLoadingScreen } from "Contexts/useShowLoadingScreen";

import { LoadingSpinnerStyles } from "./LoadingSpinner.css";
const { container, spinner, text } = LoadingSpinnerStyles;

export default function LoadingSpinner() {
  const { showLoadingScreen } = useShowLoadingScreen();
  if (showLoadingScreen)
    return (
      <Modal transparent={true}>
        <View style={container}>
          <Image source={require("./Spinner.gif")} style={spinner} />
          <Text style={text}>Carregando...</Text>
        </View>
      </Modal>
    );
}
