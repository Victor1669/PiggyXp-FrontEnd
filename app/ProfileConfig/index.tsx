import { View, Text } from "react-native";

import DeleteUserButton from "../../src/Features/UserManagement/DeleteUser/DeleteUserButton";

export default function ProfileConfig() {
  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Text>ProfileConfig</Text>
      <DeleteUserButton />
    </View>
  );
}
