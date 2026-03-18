//#region Importações
import { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { router, usePathname } from "expo-router";

import { screenValues } from "Config/screenValues";
const {
  fontSizes: { SMALL_FONT_SIZE, DEFAULT_FONT_SIZE, BIGGER_FONT_SIZE },
} = screenValues();

import { useShowSheet } from "../Contexts/useShowSheet";
import { useLevels } from "../Contexts/useLevels";

import BottomSheet from "@Components/BottomSheet/BottomSheet";

import { GlobalFonts } from "@Assets/fonts/Fonts";
import { GlobalFontColors } from "@Assets/Colors";
//#endregion

export default function ContentSheet({ sections }: { sections: any[] }) {
  const pathName = usePathname();
  const { showSheet, setShowSheet } = useShowSheet();
  const { selectedLevelIndex, levels } = useLevels();
  const insets = useSafeAreaInsets();

  const pan = useRef(new Animated.ValueXY()).current;
  const SHEET_HEIGHT = 300;

  useEffect(() => {
    // SE A ROTA MUDAR, ELE VOLTA PRA FALSE
    if (pathName !== "/Content") {
      setShowSheet(false);
      Animated.spring(pan, {
        toValue: { y: SHEET_HEIGHT, x: 0 },
        useNativeDriver: true,
      }).start();
    }
  }, [pathName]);

  const TEXT_STYLES = {
    fontFamily: GlobalFonts.madimiOne,
    color: GlobalFontColors.Dark,
  };

  const selectedLevel = levels[selectedLevelIndex];

  return (
    <BottomSheet
      height={SHEET_HEIGHT}
      yPosition={pan}
      showSheet={showSheet}
      setShowSheet={setShowSheet}
      startSheetTop={SHEET_HEIGHT}
      finalSheetTop={insets.bottom - 35}
      buttonText="Iniciar"
      style={{
        bottom: SHEET_HEIGHT * sections.length - SHEET_HEIGHT,
        paddingHorizontal: 20,
        marginBottom: 10,
      }}
      onButtonPress={() => {
        router.push(
          `/Level/LoadingLevel/?actualQuestion=${selectedLevelIndex + 1}`,
        );
      }}
      textElements={
        <View style={{ gap: 5 }}>
          <Text style={[TEXT_STYLES, { fontSize: DEFAULT_FONT_SIZE }]}>
            {sections[0].title}
          </Text>
          <Text style={[TEXT_STYLES, { fontSize: BIGGER_FONT_SIZE }]}>
            {selectedLevel.title}
          </Text>
          <Text style={[TEXT_STYLES, { fontSize: SMALL_FONT_SIZE }]}>
            Lição {selectedLevel.id} de {levels.length}
          </Text>
        </View>
      }
    />
  );
}
