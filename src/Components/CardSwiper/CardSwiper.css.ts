import { StyleSheet } from "react-native";

export const CardSwiperStyles = StyleSheet.create({
  card: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 20,
  },
  text: {
    width: "70%",
    height: 90,
    marginTop: 50,
    marginBottom: 50,
    paddingHorizontal: 20,
  },
  dotsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 50,
    marginHorizontal: 5,
    marginVertical: 10,
  },
});
