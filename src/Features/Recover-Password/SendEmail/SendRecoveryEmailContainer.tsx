import { StyleSheet, View } from "react-native";

import SendRecoveryEmailForm from "./SendRecoveryEmailForm";
import Picture from "@Components/Picture";
import Paragraph from "@Components/Paragraph";

import { AuthImages } from "@Assets/AuthImages";

export default function SendRecoveryEmailContainer() {
  return (
    <>
      <Picture
        style={lockImage}
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

const { subTitle, title, lockImage } = StyleSheet.create({
  title: {
    width: "60%",
    marginVertical: 40,
  },
  subTitle: {
    marginBottom: 40,
    width: "85%",
  },
  lockImage: { width: 100, height: 100 },
});
