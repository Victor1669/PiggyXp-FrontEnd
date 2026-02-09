import { View } from "react-native";

import ChangeUserInfoContainer from "@Auth/Components/Containers/ChangeUserInfo";

export default function ProfileConfig() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ChangeUserInfoContainer />
    </View>
  );
}
