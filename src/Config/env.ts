import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra;

export const env = {
  buildProfile: extra?.buildProfile,
  androidClientId: extra?.google?.androidClientId,
  backEndUrl: "http://192.168.1.9:3000",
};
