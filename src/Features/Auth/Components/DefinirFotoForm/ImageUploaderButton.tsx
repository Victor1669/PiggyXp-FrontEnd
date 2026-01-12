import { Image, Pressable, Text } from "react-native";

import { AuthImages } from "../../Assets/AuthImages";

import { DefinirFotoFormStyles } from "../../Styles/DefinirFotoForm.css";

const { upload } = AuthImages;
const { uploadButton } = DefinirFotoFormStyles;

interface ImageUploaderButtonTypes {
  onPress: () => Promise<void>;
}

export function ImageUploaderButton({ onPress }: ImageUploaderButtonTypes) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }, uploadButton]}
    >
      <Image source={upload} />
      <Text>Upload da sua foto</Text>
    </Pressable>
  );
}
