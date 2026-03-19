import { Pressable } from "react-native";

import Picture from "@Components/Picture";
import Paragraph from "@Components/Paragraph";

import { DefinePhotoFormStyles } from "./DefinePhoto.css";
const { uploadButton } = DefinePhotoFormStyles;

import { AuthImages } from "@Auth/Assets/AuthImages";

export function ImageUploaderButton({
  onPress,
}: {
  onPress: () => Promise<void>;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }, uploadButton]}
    >
      <Picture
        folder="auth"
        source={AuthImages.upload}
        style={{ width: 40, height: 40 }}
      />
      <Paragraph>Upload da sua foto</Paragraph>
    </Pressable>
  );
}
