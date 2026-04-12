import { Platform } from "react-native";
import { router } from "expo-router";
import * as Notifications from "expo-notifications";

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
  const { status: actualStatus } = await Notifications.getPermissionsAsync();

  if (actualStatus === "undetermined" || actualStatus === "denied") return;

  if (Platform.OS === "web") {
    alert("Expo-Notifications não funciona na Web!");
    return;
  }

  if (Platform.OS === "android") {
    await setAndroidNotificationChannelConfiguration();
  }

  await scheduleLocalNotification(title, message, route);
}

export async function requestNotificationPermission() {
  const { status: actualStatus } = await Notifications.getPermissionsAsync();

  if (actualStatus === "granted" || actualStatus === "denied") return false;

  const permissionStatus = await Notifications.requestPermissionsAsync();

  return permissionStatus.granted;
}

async function setAndroidNotificationChannelConfiguration() {
  await Notifications.setNotificationChannelAsync("default", {
    name: "Notificação",
    importance: Notifications.AndroidImportance.MAX,
  });
}

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
      data: { route },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 2,
      channelId: "default",
    },
  });
}

export function registerNotificationClickListener() {
  const subscription = Notifications.addNotificationResponseReceivedListener(
    (response) => {
      const route = response.notification.request.content.data?.route as string;

      if (route) {
        router.push(route);
      }
    },
  );

  return subscription;
}
