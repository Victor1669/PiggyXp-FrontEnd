import { StyleSheet, StatusBar } from "react-native";

const IMAGE_SIZE = 55;

export const HomeHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginTop: (StatusBar.currentHeight ?? 50) + 10,
  },
  userProfileImageContainer: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    backgroundColor: "#fff",
    borderRadius: 50,
  },
  userProfileImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: 50,
  },
  livesImageContainer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  livesImage: {
    width: 45,
    height: 35,
    marginVertical: "auto",
  },
});
