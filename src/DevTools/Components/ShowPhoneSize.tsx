import Button from "Components/Buttons/Button";

import { AppConfig } from "Config/appConfig";
import { Alert } from "react-native";

export default function ShowPhoneSize() {
  const { deviceWidth, deviceHeight, isDeviceHeightSmall, deviceScale } =
    AppConfig;

  function handleShowInfo() {
    Alert.alert(
      "Informações: ",
      `\nAltura: ${deviceHeight}px;
      \nLargura: ${deviceWidth}px;
      \nEscala: ${deviceScale};
      \nPequeno: ${isDeviceHeightSmall}
      `,
    );
  }
  return <Button onPress={handleShowInfo}>Mostrar medidas do celular</Button>;
}
