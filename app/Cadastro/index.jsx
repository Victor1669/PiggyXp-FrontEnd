import { View, StyleSheet } from "react-native";
import { GlobalColors } from "../../assets/Colors";
import CadastroForm from "../../src/Features/Auth/Components/CadastroForm";

export default function Cadastro() {
  return (
    <View style={CadastroStyles.container}>
      <CadastroForm />
    </View>
  );
}
const CadastroStyles = StyleSheet.create({
  container: {
    backgroundColor: GlobalColors.contentBackColor.Dark,
    flex: 1,
    paddingTop: 100,
  },
});
