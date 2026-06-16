import { Image, StyleProp, View, ViewStyle } from "react-native";

import { DefinePhotoFormStyles } from "../../User-CRUD/Cadastro/DefinePhoto.css";
const { uploadImageContainer } = DefinePhotoFormStyles;

import { AuthImages } from "@Auth/Assets/AuthImages";

interface ImageContainerTypes {
  image: string;
  style?: StyleProp<ViewStyle>;
}

export function ImageContainer({ image, style }: ImageContainerTypes) {
  const hasImage = !!image;
  const IMAGE_CONTAINER_PADDING = 30;
  const IMAGE_SIZE = 150;
  const TOTAL_CONTAINER_SIZE = IMAGE_SIZE + 2 * IMAGE_CONTAINER_PADDING;

  return (
    <View
      style={[
        {
          padding: hasImage ? 0 : IMAGE_CONTAINER_PADDING,
          width: TOTAL_CONTAINER_SIZE,
          height: TOTAL_CONTAINER_SIZE,
        },
        uploadImageContainer,
        style,
      ]}
    >
      <Image
        style={{
          width: hasImage ? TOTAL_CONTAINER_SIZE : IMAGE_SIZE,
          height: hasImage ? TOTAL_CONTAINER_SIZE : IMAGE_SIZE,
          borderRadius: hasImage ? 100 : 0,
        }}
        source={hasImage ? { uri: image } : { uri: AuthImages.uploadPhoto }}
      />
    </View>
  );
}
