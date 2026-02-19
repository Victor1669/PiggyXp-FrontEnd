import { Image, Pressable } from "react-native";

import { ImageContainer } from "../../../Auth/Components/ImageContainer";

import { ChangeUserInfoStyles } from "../../../User-CRUD/ChangeUserInfo/ChangeUserInfo.css";
const { imageField, selectImageButton, imageContainer } = ChangeUserInfoStyles;

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
    <Pressable onPress={onPress} style={imageField}>
      <Pressable
        onPress={(e) => {
          e.stopPropagation();
          onPress();
        }}
        style={selectImageButton}
      >
        <Image source={AuthImages.edit} />
      </Pressable>
      <ImageContainer image={image} style={imageContainer} />
    </Pressable>
  );
}
