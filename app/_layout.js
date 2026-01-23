import { useEffect } from "react";
import { Stack } from "expo-router";
import * as Updates from "expo-updates";

import { env } from "../src/Config/env";

import { ToastContainer, toastMessage } from "../src/Services/toast";

import { AuthProvider } from "../src/Features/Auth/Contexts/useAuth";

export default function RootLayout() {
  async function checkUpdate() {
    if (env.buildProfile === "development") return;
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        toastMessage({ type: "info", text: "Nova atualização disponível" });
      }
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    setTimeout(() => {
      checkUpdate();
      if (env.buildProfile === "preview") return;
      setTimeout(() => {
        toastMessage({
          type: "info",
          text: "O Backend está em: " + env.backEndUrl,
        });
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
      <ToastContainer />
    </AuthProvider>
  );
}
