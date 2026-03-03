import { View } from "react-native";
import { router } from "expo-router";

import { useAuth } from "@Auth/Contexts/useAuth";

import Button from "@Components/Button";
import UserInfo from "./Components/UserInfo";
import Achievements from "./Components/Achievements";
import Offensive from "./Components/Offensive";

import { ProfileContainerStyles } from "./Styles/ProfileContainer.css";
const { content, button } = ProfileContainerStyles;

export default function ProfileContainer() {
  const { logout } = useAuth();

  async function handleLogout() {
    await logout();
    router.replace("/Login");
  }

  return (
    <>
      <View style={content}>
        <UserInfo />
        <Achievements />
        <Offensive />
      </View>
      <Button style={button} onPress={handleLogout}>
        Sair
      </Button>
    </>
  );
}
