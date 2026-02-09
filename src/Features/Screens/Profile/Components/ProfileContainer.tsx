import { ScrollView, View } from "react-native";
import { router } from "expo-router";

import { useAuth } from "@Auth/Contexts/useAuth";
import { screenValues } from "Config/screenValues";

import Button from "@Components/Button";
import UserInfo from "./UserInfo";
import Achievements from "./Achievements";
import Offensive from "./Offensive";
import RandomMessage from "./RandomMessage";

import { ProfileContainerStyles } from "../Styles/ProfileContainer.css";
const { content } = ProfileContainerStyles;

export default function ProfileContainer() {
  const { deviceHeight, deviceWidth } = screenValues();
  const { logout } = useAuth();

  async function handleLogout() {
    await logout();
    router.replace("/Login");
  }

  return (
    <View style={content}>
      <ScrollView
        contentContainerStyle={[
          content,
          { width: deviceWidth, height: deviceHeight + 50 },
        ]}
      >
        <UserInfo />
        <Achievements />
        <Offensive />
        <RandomMessage />
        <Button
          style={{
            width: "90%",
            marginTop: 20,
            marginBottom: 30,
          }}
          onPress={handleLogout}
        >
          Sair
        </Button>
      </ScrollView>
    </View>
  );
}
