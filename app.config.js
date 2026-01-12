export default {
  expo: {
    name: "PiggyXp",
    slug: "PiggyXp-FrontEnd",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/Porco.png",
    scheme: "com.victor1669.piggyxp",
    userInterfaceStyle: "light",
    newArchEnabled: true,

    splash: {
      image: "./assets/Porco.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },

    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.victor1669.piggyxp",
    },

    android: {
      package: "com.victor1669.piggyxp",
      adaptiveIcon: {
        foregroundImage: "./assets/Porco.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      usesCleartextTraffic: true,
    },

    web: {
      favicon: "./assets/Porco.png",
    },

    plugins: [
      [
        "expo-notifications",
        {
          icon: "./assets/Porco.png",
          color: "#ffffff",
        },
      ],
      [
        "react-native-fbsdk-next",
        {
          appID: process.env.EXPO_PUBLIC_FACEBOOK_APP_ID,
          clientToken: process.env.EXPO_PUBLIC_FACEBOOK_CLIENT_TOKEN,
          displayName: "PiggyXp",
          scheme: `fb${process.env.EXPO_PUBLIC_FACEBOOK_APP_ID}`,
        },
      ],
    ],

    extra: {
      facebookAppId: process.env.EXPO_PUBLIC_FACEBOOK_APP_ID,
      eas: {
        projectId: "1492c372-380f-444a-a967-b44dd76a431c",
      },
    },
  },
};
