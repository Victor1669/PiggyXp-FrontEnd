import { View } from "react-native";

import ChangeUserInfoContainer from "Features/User-CRUD/ChangeUserInfo/ChangeUserInfo";

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
