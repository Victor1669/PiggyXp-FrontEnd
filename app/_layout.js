import { Stack } from "expo-router";

import Toast, { BaseToast } from "react-native-toast-message";

import { AuthProvider } from "../src/Features/Auth/Contexts/useAuth";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            //transform: [{ rotate: "180deg" }],
          },
        }}
      />
      <Toast
        position="top"
        swipeable={true}
        config={{
          customSuccess: (props) => (
            <BaseToast
              {...props}
              text1Style={{ color: "#f00", fontSize: 30 }}
            />
          ),
        }}
      />
    </AuthProvider>
  );
}
