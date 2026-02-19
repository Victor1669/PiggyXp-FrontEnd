import { Image, Text, View } from "react-native";

import SendRecoveryEmailForm from "./SendRecoveryEmailForm";

import { SendRecoveryEmailStyles } from "Features/Recover-Password/SendEmail/SendRecoveryEmail.css";
const { container, title, subTitle } = SendRecoveryEmailStyles;

import { AuthImages } from "@Assets/AuthImages";

export default function SendRecoveryEmailContainer() {
  return (
    <View style={container}>
      <Image source={AuthImages.lock} />
      <Text style={title}>Esqueçeu sua senha</Text>
      <Text style={subTitle}>
        Informe o e-mail da sua conta para atualizarmos sua senha.
      </Text>
      <View>
        <SendRecoveryEmailForm />
      </View>
    </View>
  );
}
