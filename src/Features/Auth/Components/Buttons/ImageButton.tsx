import RN, { Image, StyleSheet, TouchableOpacity } from "react-native";

interface ImageButtonTypes {
  onPress: () => {};
  size: number;
  imageSource: RN.ImageSourcePropType;
}
export default function ImageButton({
  onPress,
  size,
  imageSource,
}: ImageButtonTypes) {
  const ImageButtonStyles = StyleSheet.create({
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
    <TouchableOpacity style={ImageButtonStyles.button} onPress={onPress}>
      <Image style={ImageButtonStyles.image} source={imageSource} />
    </TouchableOpacity>
  );
}
