import { View, StyleSheet } from "react-native";

import AlternateSignins from "@Auth/Components/AlternateSignins";
import LoginForm from "./LoginForm";

import { GlobalColors } from "@Colors";

export default function LoginContainer() {
  return (
    <View style={LoginStyles.container}>
      <LoginForm />
      <AlternateSignins text="Logar com" />
    </View>
  );
}

const LoginStyles = StyleSheet.create({
  container: {
    backgroundColor: GlobalColors.contentBackColor.Dark,
    flex: 1,
    paddingVertical: 100,
  },
});
