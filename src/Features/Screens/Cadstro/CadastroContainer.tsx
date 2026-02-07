import { View, StyleSheet } from "react-native";

import CadastroForm from "./CadastroForm";
import AlternateSignins from "@Auth/Components/AlternateSignins";

import { GlobalColors } from "@Colors";

export default function CadastroContainer() {
  return (
    <View style={CadastroStyles.container}>
      <CadastroForm />
      <AlternateSignins text="Criar conta com" />
    </View>
  );
}
const CadastroStyles = StyleSheet.create({
  container: {
    backgroundColor: GlobalColors.contentBackColor.Dark,
    flex: 1,
    paddingVertical: 100,
  },
});
