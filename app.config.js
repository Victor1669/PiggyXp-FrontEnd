import "dotenv/config";

/**
 * Validação obrigatória (build-time)
 */
if (!process.env.EXPO_PUBLIC_FACEBOOK_APP_ID) {
  throw new Error("EXPO_PUBLIC_FACEBOOK_APP_ID não definido");
}

if (!process.env.EXPO_PUBLIC_FACEBOOK_CLIENT_TOKEN) {
  throw new Error("EXPO_PUBLIC_FACEBOOK_CLIENT_TOKEN não definido");
}

/**
 * Detecta o profile do EAS
 */
const profile = process.env.EAS_BUILD_PROFILE ?? "production";

const isDev = profile === "development";
const isPreview = profile === "preview";

const appName = isDev
  ? "PiggyXp (Dev)"
  : isPreview
  ? "PiggyXp (Preview)"
  : "PiggyXp";

const androidPackage = isDev
  ? "com.victor1669.piggyxp.dev"
  : isPreview
  ? "com.victor1669.piggyxp.preview"
  : "com.victor1669.piggyxp";

const iosBundleId = androidPackage; // Os dois tem o mesmo nome

export default {
  expo: {
    name: appName,
    slug: "PiggyXp-FrontEnd",
    version: "1.0.0",
    orientation: "portrait",

    icon: isDev
      ? "./assets/Logo-dev.png"
      : isPreview
      ? "./assets/Logo-preview.png"
      : "./assets/Logo.png",

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
      bundleIdentifier: iosBundleId,
    },

    android: {
      package: androidPackage,
      adaptiveIcon: {
        foregroundImage: "./assets/Porco.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
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
          displayName: appName,
          scheme: `fb${process.env.EXPO_PUBLIC_FACEBOOK_APP_ID}`,
        },
      ],
    ],

    extra: {
      facebookAppId: process.env.EXPO_PUBLIC_FACEBOOK_APP_ID,
      buildProfile: profile,
      eas: {
        projectId: "b18f3c9f-62e6-4427-baa3-efe71bd4ea09",
      },
    },
  },
};
