import { Pressable } from "react-native";

import { screenValues } from "Config/screenValues";

import Picture from "Components/Picture";

import { AchievementsImages } from "../Assets/AchievementsImages";
import { notifications } from "Utils/notifications";

export default function NotificationButton() {
  const { showDevTools } = screenValues();

  function handleSendNotification() {
    notifications("Conquista nova!", "Teste de conquista", "/Achievements");
  }

  if (showDevTools)
    return (
      <Pressable
        onPress={handleSendNotification}
        style={{ margin: "auto", marginTop: 30 }}
      >
        <Picture
          folder="achievements"
          style={{ width: 60, height: 60 }}
          source={
            AchievementsImages.at(
              AchievementsImages.indexOf("notificacao.png"),
            ) ?? ""
          }
        />
      </Pressable>
    );
}
