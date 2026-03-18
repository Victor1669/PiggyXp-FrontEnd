import { Pressable, Text } from "react-native";

import { useShowSheet } from "../Contexts/useShowSheet";

import { GlobalFontColors, GlobalColors } from "@Assets/Colors";

export default function SectionTitle({ title }: { title: string }) {
  const { setShowSheet } = useShowSheet();
  return (
    <Pressable
      onPress={() => setShowSheet(false)}
      style={{
        width: "92%",
        borderBottomWidth: 2,
        borderBottomColor: GlobalFontColors.Dark,
        marginBottom: 20,
      }}
    >
      <Text
        style={{
          width: "auto",
          margin: "auto",
          paddingHorizontal: 10,
          backgroundColor: GlobalColors.contentBackColor.Dark,
          transform: [{ translateY: 10 }],
          color: GlobalFontColors.Dark,
          textAlign: "center",
          fontSize: 18,
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
}
