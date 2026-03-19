import { View } from "react-native";

import SendRecoveryEmailForm from "./SendRecoveryEmailForm";
import Picture from "@Components/Picture";
import Paragraph from "@Components/Paragraph";

import { SendRecoveryEmailStyles } from "Features/Recover-Password/SendEmail/SendRecoveryEmail.css";
const { title, subTitle } = SendRecoveryEmailStyles;

import { AuthImages } from "@Assets/AuthImages";

export default function SendRecoveryEmailContainer() {
  return (
    <>
      <Picture
        style={{ width: 100, height: 100 }}
        folder="auth"
        source={AuthImages.password.lock}
      />
      <Paragraph fontSize="title" style={title}>
        Esqueçeu sua senha
      </Paragraph>
      <Paragraph fontSize="small" style={subTitle}>
        Informe o e-mail da sua conta para atualizarmos sua senha.
      </Paragraph>
      <View>
        <SendRecoveryEmailForm />
      </View>
    </>
  );
}
