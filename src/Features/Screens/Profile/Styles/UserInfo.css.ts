import { StyleSheet, Dimensions } from "react-native";

const USER_PROFILE_PICTURE_SIZE = Dimensions.get("screen").width / 4.5;

export const UserInfoStyles = StyleSheet.create({
  userInfoBackground: {
    padding: 15,
    paddingTop: 20,
    marginTop: 20,
  },
  profilePicture: {
    width: USER_PROFILE_PICTURE_SIZE,
    height: USER_PROFILE_PICTURE_SIZE,
    backgroundColor: "#AAFFEB",
    borderRadius: USER_PROFILE_PICTURE_SIZE / 2,
    borderWidth: 4,
    borderColor: "#8E8E8E",
    position: "absolute",
    left: 15,
    top: -(USER_PROFILE_PICTURE_SIZE / 2),
  },
  profileConfig: {
    margin: 15,
    position: "absolute",
    right: 0,
  },
  profileName: {
    marginTop: 40,
    fontSize: 32,
  },
  profileEmail: {
    fontSize: 16,
  },
});
