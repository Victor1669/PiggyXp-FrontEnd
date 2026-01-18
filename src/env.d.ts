declare namespace NodeJS {
  interface ProcessEnv {
    EXPO_PUBLIC_EAS_BUILD_PROFILE: "development" | "preview" | "production";
    EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID: string;
    EXPO_PUBLIC_FACEBOOK_APP_ID: string;
    EXPO_PUBLIC_FACEBOOK_CLIENT_TOKEN: string;
  }
}
