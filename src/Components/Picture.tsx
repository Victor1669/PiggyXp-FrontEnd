import RN, { Image } from "react-native";

import { env } from "Config/env";

export default function Picture({
  source,
  folder,
  style,
}: {
  source: string;
  folder: string;
  style?: RN.StyleProp<RN.ImageStyle>;
}) {
  const uri = `${env.cloudinaryLink}/${folder}/${source}`;

  return (
    <Image
      style={style}
      source={{ uri }}
      onError={(e) => {
        console.log("Image load error:", e.nativeEvent.error);
      }}
    />
  );
}
