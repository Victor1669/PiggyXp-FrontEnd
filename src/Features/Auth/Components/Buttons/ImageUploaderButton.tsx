import { Image, Pressable, Text } from "react-native";

import { DefinePhotoFormStyles } from "../../Styles/DefinePhoto.css";
const { uploadButton } = DefinePhotoFormStyles;

import { AuthImages } from "@Auth/Assets/AuthImages";

interface ImageUploaderButtonTypes {
  onPress: () => Promise<void>;
}

export function ImageUploaderButton({ onPress }: ImageUploaderButtonTypes) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }, uploadButton]}
    >
      <Image source={AuthImages.upload} />
      <Text>Upload da sua foto</Text>
    </Pressable>
  );
}
