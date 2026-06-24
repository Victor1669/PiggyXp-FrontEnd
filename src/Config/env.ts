import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra;
interface envTypes {
  buildProfile: "preview" | "development" | "production";
  androidClientId: string;
  androidPackage: string;
  backEndUrl: string;
  webClientId: string;
  cloudinaryLink: string;
  version: string;
}

export const env: envTypes = {
  buildProfile: extra?.buildProfile,
  androidClientId: extra?.google?.androidClientId,
  webClientId: extra?.google?.webClientId,
  androidPackage: extra?.androidPackage,
  backEndUrl: extra?.backEndUrl,
  cloudinaryLink: extra?.cloudinaryBaseLink,
  version: Constants.expoConfig?.version || "0.0.0",
};
