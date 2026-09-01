import { StyleSheet, TouchableOpacity } from "react-native";

import Picture from "@Components/Picture";

interface ImageButtonTypes {
  onPress: () => {};
  size: number;
  imageSource: string;
}

export default function ImageButton({
  onPress,
  size,
  imageSource,
}: ImageButtonTypes) {
  const { button, image } = StyleSheet.create({
    button: {
      width: size,
      height: size,
      marginHorizontal: 20,
      backgroundColor: "#fff",
      borderRadius: 25,
      overflow: "hidden",
    },
    image: {
      width: size,
      height: size,
    },
  });

  return (
    <TouchableOpacity style={button} onPress={onPress}>
      <Picture folder="auth" style={image} source={imageSource} />
    </TouchableOpacity>
  );
}
