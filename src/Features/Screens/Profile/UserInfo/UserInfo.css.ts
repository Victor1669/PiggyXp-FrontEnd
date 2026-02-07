import { StyleSheet } from "react-native";

const USER_INFO_HEIGHT = 200;
const USER_PROFILE_PICTURE_SIZE = 110;

export const UserInfoStyles = StyleSheet.create({
  userInfoContainer: {
    width: "90%",
    height: USER_INFO_HEIGHT,
  },
  userInfoBackground: {
    height: USER_INFO_HEIGHT,
    paddingHorizontal: 15,
  },
  profilePicture: {
    width: USER_PROFILE_PICTURE_SIZE,
    height: USER_PROFILE_PICTURE_SIZE,
    borderRadius: USER_PROFILE_PICTURE_SIZE / 2,
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
    marginTop: 60,
    fontSize: 32,
  },
  profileEmail: {
    fontSize: 16,
  },
});
