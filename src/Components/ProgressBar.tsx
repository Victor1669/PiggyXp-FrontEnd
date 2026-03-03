import RN, { View } from "react-native";

export default function ProgressBar({
  width,
  maxValue,
  actualValue,
  style,
}: {
  width: number;
  maxValue: number;
  actualValue: number;
  style?: RN.StyleProp<RN.ViewStyle>;
}) {
  const barStyle: RN.StyleProp<RN.ViewStyle> = {
    height: 30,
    borderRadius: 50,
  };
  return (
    <View
      style={[
        barStyle,
        style,
        { width, backgroundColor: "#fff", overflow: "hidden" },
      ]}
    >
      <View
        style={[
          barStyle,
          {
            backgroundColor: "#67E34F",
            width: (width / maxValue) * actualValue,
          },
        ]}
      />
    </View>
  );
}
