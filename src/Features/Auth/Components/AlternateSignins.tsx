import { Text, View } from "react-native";
import { AuthImages } from "../Assets/AuthImages";
import ImageButton from "./ImageButton";

const {
  logos: { google, facebook },
} = AuthImages;

interface AlternateSigninsProps {
  text: string;
  onGoogleClick: () => {};
  onFacebookClick: () => {};
}

export default function AlternateSignins({
  text,
  onGoogleClick,
  onFacebookClick,
}: AlternateSigninsProps) {
  return (
    <View
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 100,
        alignItems: "center",
      }}
    >
      <Text style={{ color: "#fff", fontSize: 18, marginBottom: 20 }}>
        {text}
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
