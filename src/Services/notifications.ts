import * as Notifications from "expo-notifications";

import { Platform } from "react-native";

// CONFIGURAÇÕES DA NOTIFICAÇÃO
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function notifications() {
  // Verifica permissão atual
  const { status } = await Notifications.getPermissionsAsync();

  // SE NÃO TIVER PERMISSÃO, SOLICITA A PERMISSÃO
  if (status === "undetermined" || status === "denied") {
    const { newStatus } = await requestNotificationPermission();

    if (newStatus !== "granted") return;
  }

  if (Platform.OS === "web") {
    alert("Expo-Notifications não funciona na Web!");
    return;
  }

  if (Platform.OS === "android") {
    setAndroidNotificationChannelConfiguration();
  }

  scheduleLocalNotification();
}

async function requestNotificationPermission() {
  const { status: newStatus } = await Notifications.requestPermissionsAsync();

  return { newStatus };
}

async function setAndroidNotificationChannelConfiguration() {
  await Notifications.setNotificationChannelAsync("default", {
    name: "Notificação",
    importance: Notifications.AndroidImportance.MAX,
  });
}

async function scheduleLocalNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Notificação com delay",
      subtitle: "Teste com notificação",
      color: "#ff00ff",
      body: "Chega em 2 segundos",
    },
    trigger: {
      channelId: "default",
      seconds: 2,
    },
  });
}
