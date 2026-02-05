import { View } from "react-native";
import { useRouter } from "expo-router";

import { useAuth } from "../../../../src/Features/Auth/Contexts/useAuth";

import Button from "../../../../src/Components/Button";
import UserInfo from "./UserInfo/UserInfo";
import Achievements from "./Achievements/Achievements";
import Offensive from "./Offensive/Offensive";
import RandomMessage from "./RandomMessage/RandomMessage";

import { ProfileContainerStyles } from "./ProfileContainer.css";
const { profileContainer } = ProfileContainerStyles;

export default function ProfileContainer() {
  const router = useRouter();
  const { logout } = useAuth();

  function handleLogout() {
    logout();
    router.replace("/Login");
  }

  return (
    <View style={profileContainer}>
      <UserInfo />
      <Achievements />
      <Offensive />
      <RandomMessage />
      <Button style={{ marginVertical: 20 }} onPress={handleLogout}>
        Sair
      </Button>
    </View>
  );
}
