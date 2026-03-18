import { Pressable, Text } from "react-native";

import { screenValues } from "Config/screenValues";
const {
  fontSizes: { DEFAULT_FONT_SIZE },
} = screenValues();

import Picture from "@Components/Picture";

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
      <Text style={{ fontSize: DEFAULT_FONT_SIZE, color: "#fff" }}>
        Upload da sua foto
      </Text>
    </Pressable>
  );
}
