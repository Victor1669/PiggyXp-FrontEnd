import { ScrollView, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { screenValues } from "Config/screenValues";

import { useAuth } from "@Auth/Contexts/useAuth";

import Button from "@Components/Button";
import UserInfo from "./Components/UserInfo";
import Achievements from "./Components/Achievements";
import Offensive from "./Components/Offensive";
import LivesTimer from "./Components/LivesTimer";

import { ProfileContainerStyles } from "./Styles/ProfileContainer.css";
const { content, button } = ProfileContainerStyles;

export default function ProfileContainer() {
  const { logout } = useAuth();

  const { isPreviewBuild } = screenValues();

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
