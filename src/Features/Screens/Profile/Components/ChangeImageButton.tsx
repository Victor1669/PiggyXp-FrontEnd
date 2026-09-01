import { Pressable, StyleSheet } from "react-native";

import { ImageContainer } from "../../../Auth/Components/ImageContainer";
import Picture from "@Components/Picture";

import { AuthImages } from "@Auth/Assets/AuthImages";

interface ChangeImageButtonProps {
  onPress: () => {};
  image: string;
}

export default function ChangeImageButton({
  onPress,
  image,
}: ChangeImageButtonProps) {
  return (
    <Pressable onPress={onPress} style={Styles.imageField}>
      <Pressable
        onPress={(e) => {
          e.stopPropagation();
          onPress();
        }}
        style={Styles.selectImageButton}
      >
        <Picture
          style={{ width: 15, height: 15 }}
          folder="auth"
          source={AuthImages.edit}
        />
      </Pressable>
      <ImageContainer image={image} style={Styles.imageContainer} />
    </Pressable>
  );
}

const Styles = StyleSheet.create({
  imageField: {
    height: 210,
    marginBottom: 30,
  },
  selectImageButton: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 7,
    borderRadius: 50,
    zIndex: 1,
    position: "absolute",
    right: 0,
  },
  imageContainer: {
    marginVertical: 0,
  },
});
