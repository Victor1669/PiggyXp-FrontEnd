import { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";

import { useAuth } from "@Auth/Contexts/useAuth";

import { GetUserInfo } from "@Auth/Services/UserInfoService";

export default function Home() {
  const { login, userToken, refreshToken } = useAuth();

  useEffect(() => {
    (async function getUserInfo() {
      const rfToken = await refreshToken.get();

      const { userId } = (await userToken.decode()) as {
        userId: string;
      };

      const { data, status } = await GetUserInfo(userId);

      if (status < 300) {
        await login({ ...data, id: userId });
      }
    })();
  }, []);

  return (
    <View style={HomeStyles.container}>
      <Text style={{ color: "#fff", fontSize: 32 }}>HOME</Text>
    </View>
  );
}

const HomeStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  Image: {
    width: 120,
    height: 100,
    borderRadius: 50,
    marginTop: 200,
  },
});
