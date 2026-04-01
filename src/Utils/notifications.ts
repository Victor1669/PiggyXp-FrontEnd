import { Platform } from "react-native";
import { router } from "expo-router";

import * as Notifications from "expo-notifications";

// CONFIGURAÇÕES DA NOTIFICAÇÃO
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function notifications(
  title: string,
  message: string,
  route?: string,
) {
  // Verifica permissão atual
  const { status: actualStatus } = await Notifications.getPermissionsAsync();

  // SE NÃO TIVER PERMISSÃO, SAI DA FUNÇÃO
  if (actualStatus === "undetermined" || actualStatus === "denied") return;

  if (Platform.OS === "web") {
    alert("Expo-Notifications não funciona na Web!");
    return;
  }

  if (Platform.OS === "android") {
    setAndroidNotificationChannelConfiguration();
  }

  scheduleLocalNotification(title, message, route);
}

/**
 * PERMISSÃO DE NOTIFICAÇÃO
 */
export async function requestNotificationPermission() {
  const { status: actualStatus } = await Notifications.getPermissionsAsync();

  console.log(actualStatus);

  if (actualStatus === "granted" || "denied") return false;

  const permissionStatus = await Notifications.requestPermissionsAsync();

  return permissionStatus.granted;
}

async function setAndroidNotificationChannelConfiguration() {
  await Notifications.setNotificationChannelAsync("default", {
    name: "Notificação",
    importance: Notifications.AndroidImportance.MAX,
  });
}

/**
 * CONTEÚDO DA NOTIFICAÇÃO
 */
async function scheduleLocalNotification(
  title: string,
  message: string,
  route: string = "",
) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title,
      color: "#ff00ff",
      body: message,
      ...(route && { data: { route } }),
    },
    trigger: {
      channelId: "default",
      seconds: 2,
    },
  });
}

/**
 * LISTENER PARA CLIQUE DA NOTIFICAÇÃO
 */
export function registerNotificationClickListener() {
  const subscription = Notifications.addNotificationResponseReceivedListener(
    (response) => {
      const route = response.notification.request.content.data?.route as string;

      if (route) {
        router.push(route);
      }
    },
  );

  return subscription; // retorne para poder remover o listener depois
}
