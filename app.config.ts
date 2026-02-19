import "dotenv/config";

const {
  EXPO_PUBLIC_FACEBOOK_APP_ID,
  EXPO_PUBLIC_FACEBOOK_CLIENT_TOKEN,
  EXPO_PUBLIC_EAS_BUILD_PROFILE,
  // EXPO_PUBLIC_BACKEND_URL
  EXPO_PUBLIC_PRODUCTION_GOOGLE_ANDROID_CLIENT_ID,
  EXPO_PUBLIC_PREVIEW_GOOGLE_ANDROID_CLIENT_ID,
  EXPO_PUBLIC_DEVELOPMENT_GOOGLE_ANDROID_CLIENT_ID,
  EXPO_PUBLIC_WEB_GOOGLE_ANDROID_CLIENT_ID,
} = process.env;

/**
 * Validação obrigatória (build-time)
 */
if (!EXPO_PUBLIC_FACEBOOK_APP_ID) {
  throw new Error("EXPO_PUBLIC_FACEBOOK_APP_ID não definido!");
}

if (!EXPO_PUBLIC_FACEBOOK_CLIENT_TOKEN) {
  throw new Error("EXPO_PUBLIC_FACEBOOK_CLIENT_TOKEN não definido!");
}

if (!EXPO_PUBLIC_EAS_BUILD_PROFILE) {
  throw new Error("EXPO_PUBLIC_EAS_BUILD_PROFILE não definido!");
}
if (!EXPO_PUBLIC_WEB_GOOGLE_ANDROID_CLIENT_ID) {
  throw new Error("EXPO_PUBLIC_WEB_GOOGLE_ANDROID_CLIENT_ID não definido!");
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

const androidPackage = isDev
  ? "com.victor1669.piggyxp.dev"
  : isPreview
    ? "com.victor1669.piggyxp.preview"
    : "com.victor1669.piggyxp";

const androidClientId = isDev
  ? EXPO_PUBLIC_DEVELOPMENT_GOOGLE_ANDROID_CLIENT_ID
  : isPreview
    ? EXPO_PUBLIC_PREVIEW_GOOGLE_ANDROID_CLIENT_ID
    : EXPO_PUBLIC_PRODUCTION_GOOGLE_ANDROID_CLIENT_ID;

export default {
  expo: {
    name: appName,
    slug: "PiggyXp-FrontEnd",
    version: "1.0.0",
    orientation: "portrait",

    icon: appIcon,

    scheme: androidPackage,
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
      enableProguardInReleaseBuilds: true,
      enableShrinkResourcesInReleaseBuilds: true,
      enableSeparateBuildPerCPUArchiteture: true,
      defaultConfig: {
        ndk: {
          abiFilters: ["arm64-v8a", "armeabi-v7a"],
        },
      },
    },

    ios: {
      bundleIdentifier: androidPackage,
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
      androidPackage: androidPackage,
      // backEndUrl: EXPO_PUBLIC_BACKEND_URL,
      google: {
        androidClientId: androidClientId,
        webClientId: EXPO_PUBLIC_WEB_GOOGLE_ANDROID_CLIENT_ID,
      },
      eas: {
        projectId: "b18f3c9f-62e6-4427-baa3-efe71bd4ea09",
      },
    },
  },
};
