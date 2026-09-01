import { ScrollView, StatusBar, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { screenValues } from "Config/screenValues";
const { isPreviewBuild, isDeviceHeigthSmall } = screenValues();

import { useAuth } from "@Auth/Contexts/useAuth";

import Button from "Components/Buttons/Button";
import UserInfo from "./Components/UserInfo";
import Achievements from "./Components/Achievements";
import Offensive from "./Components/Offensive";
import LivesTimer from "./Components/LivesTimer";

export default function ProfileContainer() {
  const { logout } = useAuth();

  async function handleLogout() {
    await logout();
    router.replace("/Login");
  }

  return (
    <SafeAreaView style={{ flex: 1, paddingBottom: 80 }}>
      <ScrollView>
        <View style={content}>
          <UserInfo />
          <Achievements />
          <Offensive />
          {!isPreviewBuild && <LivesTimer />}
        </View>
        <Button style={button} onPress={handleLogout}>
          Sair
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
}

export const { button, content } = StyleSheet.create({
  content: {
    paddingTop: StatusBar.currentHeight || 50,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: isDeviceHeigthSmall ? 20 : 5,
  },
  button: {
    width: "90%",
    marginVertical: 30,
  },
});
