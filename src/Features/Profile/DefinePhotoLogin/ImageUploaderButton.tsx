import { Image, Pressable, Text } from "react-native";

import { DefinePhotoFormStyles } from "./DefinePhotoForm.css";

const { uploadButton } = DefinePhotoFormStyles;

interface ImageUploaderButtonTypes {
  onPress: () => Promise<void>;
}

export function ImageUploaderButton({ onPress }: ImageUploaderButtonTypes) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }, uploadButton]}
    >
      <Image source={require("./Assets/Upload.png")} />
      <Text>Upload da sua foto</Text>
    </Pressable>
  );
}
