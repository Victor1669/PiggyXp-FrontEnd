import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra;

interface envTypes {
  buildProfile: "preview" | "development" | "production";
  androidClientId: string;
  androidPackage: string;
  backEndUrl: string;
}

export const env: envTypes = {
  buildProfile: extra?.buildProfile,
  androidClientId: extra?.google?.androidClientId,
  androidPackage: extra?.androidPackage,
  // backEndUrl: extra?.backEndUrl,
  backEndUrl: "http://192.168.1.7:3000",
};
