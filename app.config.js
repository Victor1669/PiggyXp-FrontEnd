import "dotenv/config";

const {
  EXPO_PUBLIC_FACEBOOK_APP_ID,
  EXPO_PUBLIC_FACEBOOK_CLIENT_TOKEN,
  EXPO_PUBLIC_EAS_BUILD_PROFILE,
  // EXPO_PUBLIC_BACKEND_URL
  EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
} = process.env;

/**
 * Validação obrigatória (build-time)
 */
if (!EXPO_PUBLIC_FACEBOOK_APP_ID) {
  throw new Error("EXPO_PUBLIC_FACEBOOK_APP_ID não definido");
}

if (!EXPO_PUBLIC_FACEBOOK_CLIENT_TOKEN) {
  throw new Error("EXPO_PUBLIC_FACEBOOK_CLIENT_TOKEN não definido");
}

if (!EXPO_PUBLIC_EAS_BUILD_PROFILE) {
  throw new Error("EXPO_PUBLIC_EAS_BUILD_PROFILE não definido");
}

/**
 * Detecta o profile do EAS
 */
const profile = EXPO_PUBLIC_EAS_BUILD_PROFILE ?? "production";

const isDev = profile === "development";
const isPreview = profile === "preview";

const appName = isDev
  ? "PiggyXp (Dev)"
  : isPreview
    ? "PiggyXp (Preview)"
    : "PiggyXp";

const appIcon = isDev
  ? "./assets/Logo-dev.png"
  : isPreview
    ? "./assets/Logo-preview.png"
    : "./assets/Logo.png";

const androidPackage = "com.victor1669.piggyxp";

export default {
  expo: {
    name: appName,
    slug: "PiggyXp-FrontEnd",
    version: "1.0.0",
    orientation: "portrait",

    icon: appIcon,

    scheme: "com.victor1669.piggyxp",
    userInterfaceStyle: "light",
    newArchEnabled: true,

    splash: {
      image: appIcon,
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },

    android: {
      package: androidPackage,
      adaptiveIcon: {
        foregroundImage: appIcon,
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      usesCleartextTraffic: true,
    },

    web: {
      favicon: appIcon,
    },

    plugins: [
      [
        "expo-notifications",
        {
          icon: appIcon,
          color: "#ffffff",
        },
      ],
      [
        "react-native-fbsdk-next",
        {
          appID: EXPO_PUBLIC_FACEBOOK_APP_ID,
          clientToken: EXPO_PUBLIC_FACEBOOK_CLIENT_TOKEN,
          displayName: appName,
          scheme: `fb${EXPO_PUBLIC_FACEBOOK_APP_ID}`,
        },
      ],
    ],

    updates: {
      url: "https://u.expo.dev/b18f3c9f-62e6-4427-baa3-efe71bd4ea09",
    },

    runtimeVersion: {
      policy: "appVersion",
    },

    extra: {
      buildProfile: profile,
      // backEndUrl: EXPO_PUBLIC_BACKEND_URL,
      google: {
        androidClientId: EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID,
      },
      eas: {
        projectId: "b18f3c9f-62e6-4427-baa3-efe71bd4ea09",
      },
    },
  },
};
