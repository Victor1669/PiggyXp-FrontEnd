import { View, StyleSheet } from "react-native";
import LoginForm from "../../src/Features/Auth/Components/LoginForm";
import { GlobalColors } from "../../assets/Colors";

export default function LoginContainer() {
  return (
    <View style={LoginStyles.container}>
      <LoginForm />
    </View>
  );
}

const LoginStyles = StyleSheet.create({
  container: {
    backgroundColor: GlobalColors.contentBackColor.Dark,
    flex: 1,
    paddingTop: 100,
  },
});
