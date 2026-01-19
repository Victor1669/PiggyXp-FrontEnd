import { Dimensions, StyleSheet } from "react-native";
import { GlobalColors } from "../../../../assets/Colors";

const { width, height } = Dimensions.get("window");

const DOTS_SECTION_HEIGHT = 150;

export const SwiperStyles = StyleSheet.create({
  container: {
    height,
    backgroundColor: "#97d98E",
    justifyContent: "center",
  },
  content: {
    height: height * 0.9,
  },
  slide: {
    width,
    height: height - DOTS_SECTION_HEIGHT,
    backgroundColor: "#97d98E",

    alignItems: "center",
  },
  text: {
    color: "#000000",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 50,
    paddingHorizontal: 20,
  },
  dotsContainer: {
    width,
    height: DOTS_SECTION_HEIGHT,
    backgroundColor: "#97d98E",

    flexDirection: "row",
    justifyContent: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#000000",
    marginHorizontal: 5,
    marginVertical: 110,
  },
  

});
