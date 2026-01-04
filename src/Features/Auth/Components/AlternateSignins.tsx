import { Text, View } from "react-native";
import { AuthImages } from "../Assets/AuthImages";
import ImageButton from "./ImageButton";

const {
  logos: { google, facebook },
} = AuthImages;

interface AlternateSigninsTypes {
  onGoogleClick: () => {};
  onFacebookClick: () => {};
  bottom: number;
}

export default function AlternateSignins({
  onGoogleClick,
  onFacebookClick,
  bottom,
}: AlternateSigninsTypes) {
  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom,
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#fff", fontSize: 18, marginBottom: 20 }}>
        Logar com
      </Text>

      <View style={{ flexDirection: "row" }}>
        <ImageButton size={50} onPress={onGoogleClick} imageSource={google} />
        <ImageButton
          size={50}
          onPress={onFacebookClick}
          imageSource={facebook}
        />
      </View>
    </View>
  );
}
