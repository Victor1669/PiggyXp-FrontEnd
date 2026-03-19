import { Image, Modal, View } from "react-native";

import { useShowLoadingScreen } from "Contexts/useShowLoadingScreen";

import Paragraph from "@Components/Paragraph";

import { LoadingSpinnerStyles } from "./LoadingSpinner.css";
const { container, spinner } = LoadingSpinnerStyles;

export default function LoadingSpinner() {
  const { showLoadingScreen } = useShowLoadingScreen();
  if (showLoadingScreen)
    return (
      <Modal transparent animationType="fade" statusBarTranslucent>
        <View style={container}>
          <Image source={require("./Spinner.gif")} style={spinner} />
          <Paragraph fontSize="bigger">Carregando...</Paragraph>
        </View>
      </Modal>
    );
}
