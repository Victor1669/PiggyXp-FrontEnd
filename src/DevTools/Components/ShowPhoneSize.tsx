import Button from "Components/Button";

import { screenValues } from "Config/screenValues";
import { Alert } from "react-native";

export default function ShowPhoneSize() {
  const { deviceWidth, deviceHeight, isDeviceHeigthSmall, deviceScale } =
    screenValues();

  function handleShowInfo() {
    Alert.alert(
      "Informações: ",
      `\nAltura: ${deviceHeight}px;
      \nLargura: ${deviceWidth}px;
      \nEscala: ${deviceScale};
      \nPequeno: ${isDeviceHeigthSmall}
      `,
    );
  }
  return <Button onPress={handleShowInfo}>Mostrar medidas do celular</Button>;
}
