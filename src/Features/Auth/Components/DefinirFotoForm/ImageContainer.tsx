import { Image, View } from "react-native";
import { AuthImages } from "../../Assets/AuthImages";
import { DefinirFotoFormStyles } from "../../Styles/DefinirFotoForm.css";

const { uploadPhoto } = AuthImages;
const { uploadImageContainer } = DefinirFotoFormStyles;

const IMAGE_CONTAINER_PADDING = 30;
const IMAGE_SIZE = 150;
const TOTAL_CONTAINER_SIZE = IMAGE_SIZE + 2 * IMAGE_CONTAINER_PADDING;

interface ImageContainerTypes {
  image: string;
}

export function ImageContainer({ image }: ImageContainerTypes) {
  const hasImage = !!image;

  return (
    <View
      style={[
        {
          padding: hasImage ? 0 : IMAGE_CONTAINER_PADDING,
          width: TOTAL_CONTAINER_SIZE,
          height: TOTAL_CONTAINER_SIZE,
        },
        uploadImageContainer,
      ]}
    >
      <Image
        style={{
          width: hasImage ? TOTAL_CONTAINER_SIZE : IMAGE_SIZE,
          height: hasImage ? TOTAL_CONTAINER_SIZE : IMAGE_SIZE,
          borderRadius: hasImage ? 100 : 0,
        }}
        source={hasImage ? { uri: image } : uploadPhoto}
      />
    </View>
  );
}
