import { Dimensions, StyleSheet } from "react-native";

import { GlobalColors } from "@Assets/Colors";

const { width, height } = Dimensions.get("window");

const DOTS_SECTION_HEIGHT = 50;

export const SwiperStyles = StyleSheet.create({
  container: {
    height,
    backgroundColor: GlobalColors.splashBackColor,
    justifyContent: "center",
  },
  content: {
    height: height * 0.9,
  },
  slide: {
    width,
    height: height - DOTS_SECTION_HEIGHT,

    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 200,
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
    height: DOTS_SECTION_HEIGHT,
    backgroundColor: GlobalColors.splashBackColor,

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
  skipLink: {
    marginVertical: 25,
    marginHorizontal: 15,
  },
});
