import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const DOTS_SECTION_HEIGHT = 150;

export const SwiperStyles = StyleSheet.create({
  container: {
    height,
    backgroundColor: "#0f0",
    justifyContent: "center",
  },
  content: {
    height: height * 0.8,
  },
  slide: {
    width,
    height: height - DOTS_SECTION_HEIGHT,
    backgroundColor: "#3498db",

    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
  },
  dotsContainer: {
    width,
    height: DOTS_SECTION_HEIGHT,
    backgroundColor: "#f00",

    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#3498db",
    marginHorizontal: 5,
    marginVertical: 5,
  },
});
