import { useEffect } from "react";
import { Alert } from "react-native";
import { Stack } from "expo-router";
import * as Updates from "expo-updates";
import Toast, { BaseToast } from "react-native-toast-message";

import { AuthProvider } from "../src/Features/Auth/Contexts/useAuth";
import { env } from "../src/Config/env";

export default function RootLayout() {
  async function checkUpdate() {
    if (process.env.EXPO_PUBLIC_EAS_BUILD_PROFILE === "development") return;
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        Alert.alert("Nova atualização disponível");
      }
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    setTimeout(() => {
      checkUpdate();
      setTimeout(() => {
        Alert.alert("O Backend deverá rodar em: " + env.backEndUrl);
      }, 1000);
    }, 100);
  }, []);
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            //transform: [{ rotate: "180deg" }],
          },
        }}
        key={Date.now().toString()}
      />
      <Toast
        position="top"
        swipeable={true}
        config={{
          customSuccess: (props) => (
            <BaseToast
              {...props}
              text1Style={{ color: "#f00", fontSize: 30 }}
            />
          ),
        }}
      />
    </AuthProvider>
  );
}
