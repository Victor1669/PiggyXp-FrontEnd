import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const CardSwiperStyles = StyleSheet.create({
  card: {
    width,

    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    marginBottom: 20,
  },
  title: {
    width: width - 20,
    textAlign: "center",
    fontWeight: "600",
    fontSize: 22,
  },
  text: {
    width: "70%",
    height: 60,
    color: "#000000",
    fontSize: 15,
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
    paddingHorizontal: 20,
  },
  dotsContainer: {
    width,

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
